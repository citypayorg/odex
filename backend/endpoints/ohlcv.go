package endpoints

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/byteball/odex-backend/interfaces"
	"github.com/byteball/odex-backend/types"
	"github.com/byteball/odex-backend/utils/httputils"
	"github.com/byteball/odex-backend/ws"
	"github.com/gorilla/mux"
)

type OHLCVEndpoint struct {
	ohlcvService interfaces.OHLCVService
}

func ServeOHLCVResource(
	r *mux.Router,
	ohlcvService interfaces.OHLCVService,
) {
	e := &OHLCVEndpoint{ohlcvService}
	r.HandleFunc("/ohlcv", e.handleGetOHLCV).Methods("GET")
	ws.RegisterChannel(ws.OHLCVChannel, e.ohlcvWebSocket)
}

func (e *OHLCVEndpoint) handleGetOHLCV(w http.ResponseWriter, r *http.Request) {
	var p types.OHLCVParams

	v := r.URL.Query()
	bt := v.Get("baseToken")
	qt := v.Get("quoteToken")
	pair := v.Get("pairName")
	unit := v.Get("unit")
	duration := v.Get("duration")
	from := v.Get("from")
	to := v.Get("to")

	if unit == "" {
		p.Units = "hour"
	} else {
		p.Units = unit
	}

	if duration == "" {
		p.Duration = 24
	} else {
		d, _ := strconv.Atoi(duration)
		p.Duration = int64(d)
	}

	now := time.Now()

	if to == "" {
		p.To = now.Unix()
	} else {
		t, _ := strconv.Atoi(to)
		p.To = int64(t)
	}

	if from == "" {
		p.From = now.AddDate(-1, 0, 0).Unix()
	} else {
		f, _ := strconv.Atoi(from)
		p.From = int64(f)
	}

	if bt == "" {
		httputils.WriteError(w, http.StatusBadRequest, "baseToken Parameter missing")
		return
	}

	if qt == "" {
		httputils.WriteError(w, http.StatusBadRequest, "quoteToken Parameter missing")
		return
	}

	if !isValidAsset(bt) {
		httputils.WriteError(w, http.StatusBadRequest, "Invalid base token asset in ohlcv")
		return
	}

	if !isValidAsset(qt) {
		httputils.WriteError(w, http.StatusBadRequest, "Invalid quote token asset in ohlcv")
		return
	}

	p.Pair = []types.PairAssets{{
		BaseToken:  bt,
		QuoteToken: qt,
		Name:       pair,
	}}

	res, err := e.ohlcvService.GetOHLCV(p.Pair, p.Duration, p.Units, p.From, p.To)
	if err != nil {
		logger.Error(err)
		httputils.WriteError(w, http.StatusInternalServerError, "")
		return
	}

	if res == nil {
		httputils.WriteJSON(w, http.StatusOK, []*types.Tick{})
		return
	}

	httputils.WriteJSON(w, http.StatusOK, res)
}

func (e *OHLCVEndpoint) ohlcvWebSocket(input interface{}, c *ws.Client) {
	b, _ := json.Marshal(input)
	var ev *types.WebsocketEvent

	err := json.Unmarshal(b, &ev)
	if err != nil {
		logger.Error(err)
		return
	}

	socket := ws.GetOHLCVSocket()

	if ev.Type != "SUBSCRIBE" && ev.Type != "UNSUBSCRIBE" {
		socket.SendErrorMessage(c, "Invalid payload")
		return
	}

	if ev.Type == "SUBSCRIBE" {
		b, _ = json.Marshal(ev.Payload)
		var p *types.SubscriptionPayload

		err = json.Unmarshal(b, &p)
		if err != nil {
			logger.Error(err)
			return
		}

		if p.BaseToken == "" {
			socket.SendErrorMessage(c, "Empty base token in ohlcv")
			return
		}

		if p.QuoteToken == "" {
			socket.SendErrorMessage(c, "Empty Quote Token in ohlcv")
			return
		}

		now := time.Now()

		if p.From == 0 {
			p.From = now.AddDate(-1, 0, 0).Unix()
		}

		if p.To == 0 {
			p.To = now.Unix()
		}

		if p.Duration == 0 {
			p.Duration = 24
		}

		if p.Units == "" {
			p.Units = "hour"
		}

		e.ohlcvService.Subscribe(c, p)
	}

	if ev.Type == "UNSUBSCRIBE" {
		e.ohlcvService.Unsubscribe(c)
	}
}
