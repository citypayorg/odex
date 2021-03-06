// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import mock "github.com/stretchr/testify/mock"

// PriceService is an autogenerated mock type for the PriceService type
type PriceService struct {
	mock.Mock
}

// GetDollarMarketPrices provides a mock function with given fields: baseCurrencies
func (_m *PriceService) GetDollarMarketPrices(baseCurrencies []string) (map[string]float64, error) {
	ret := _m.Called(baseCurrencies)

	var r0 map[string]float64
	if rf, ok := ret.Get(0).(func([]string) map[string]float64); ok {
		r0 = rf(baseCurrencies)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(map[string]float64)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func([]string) error); ok {
		r1 = rf(baseCurrencies)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetMultipleMarketPrices provides a mock function with given fields: baseCurrencies, quoteCurrencies
func (_m *PriceService) GetMultipleMarketPrices(baseCurrencies []string, quoteCurrencies []string) (map[string]map[string]float64, error) {
	ret := _m.Called(baseCurrencies, quoteCurrencies)

	var r0 map[string]map[string]float64
	if rf, ok := ret.Get(0).(func([]string, []string) map[string]map[string]float64); ok {
		r0 = rf(baseCurrencies, quoteCurrencies)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(map[string]map[string]float64)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func([]string, []string) error); ok {
		r1 = rf(baseCurrencies, quoteCurrencies)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
