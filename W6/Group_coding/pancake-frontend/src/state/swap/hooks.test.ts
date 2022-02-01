import { parse } from 'querystring'
import { Field } from './actions'
import { DEFAULT_OUTPUT_CURRENCY } from './constants'
import { queryParametersToSwapState } from './hooks'

describe('hooks', () => {
  describe('#queryParametersToSwapState', () => {
    test('BNB to DAI', () => {
      expect(
        queryParametersToSwapState(
          parse(
            'inputCurrency=BNB&outputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&exactAmount=20.5&exactField=outPUT',
          ),
        ),
      ).toEqual({
        [Field.OUTPUT]: { currencyId: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
        [Field.INPUT]: { currencyId: 'BNB' },
        typedValue: '20.5',
        independentField: Field.OUTPUT,
        pairDataById: {},
        derivedPairDataById: {},
        recipient: null,
      })
    })

    test('should return BNB BUSD pair by default', () => {
      expect(queryParametersToSwapState(parse(''))).toEqual({
        [Field.OUTPUT]: { currencyId: DEFAULT_OUTPUT_CURRENCY },
        [Field.INPUT]: { currencyId: 'BNB' },
        typedValue: '',
        independentField: Field.INPUT,
        pairDataById: {},
        derivedPairDataById: {},
        recipient: null,
      })
    })

    test('does not duplicate BNB for invalid output token', () => {
      expect(queryParametersToSwapState(parse('outputCurrency=invalid'))).toEqual({
        [Field.INPUT]: { currencyId: '' },
        [Field.OUTPUT]: { currencyId: 'BNB' },
        typedValue: '',
        independentField: Field.INPUT,
        pairDataById: {},
        derivedPairDataById: {},
        recipient: null,
      })
    })

    test('output BNB only', () => {
      expect(queryParametersToSwapState(parse('outputCurrency=bnb&exactAmount=20.5'))).toEqual({
        [Field.OUTPUT]: { currencyId: 'BNB' },
        [Field.INPUT]: { currencyId: '' },
        typedValue: '20.5',
        independentField: Field.INPUT,
        pairDataById: {},
        derivedPairDataById: {},
        recipient: null,
      })
    })

    test('invalid recipient', () => {
      expect(queryParametersToSwapState(parse('outputCurrency=BNB&exactAmount=20.5&recipient=abc'))).toEqual({
        [Field.OUTPUT]: { currencyId: 'BNB' },
        [Field.INPUT]: { currencyId: '' },
        typedValue: '20.5',
        independentField: Field.INPUT,
        pairDataById: {},
        derivedPairDataById: {},
        recipient: null,
      })
    })

    test('valid recipient', () => {
      expect(
        queryParametersToSwapState(
          parse('outputCurrency=BNB&exactAmount=20.5&recipient=0x0fF2D1eFd7A57B7562b2bf27F3f37899dB27F4a5'),
        ),
      ).toEqual({
        [Field.OUTPUT]: { currencyId: 'BNB' },
        [Field.INPUT]: { currencyId: '' },
        typedValue: '20.5',
        independentField: Field.INPUT,
        pairDataById: {},
        derivedPairDataById: {},
        recipient: '0x0fF2D1eFd7A57B7562b2bf27F3f37899dB27F4a5',
      })
    })
    test('accepts any recipient', () => {
      expect(queryParametersToSwapState(parse('outputCurrency=BNB&exactAmount=20.5&recipient=bob.argent.xyz'))).toEqual(
        {
          [Field.OUTPUT]: { currencyId: 'BNB' },
          [Field.INPUT]: { currencyId: '' },
          typedValue: '20.5',
          independentField: Field.INPUT,
          pairDataById: {},
          derivedPairDataById: {},
          recipient: 'bob.argent.xyz',
        },
      )
    })
  })
})
