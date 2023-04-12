## Gas Usage Optimization Disabled

```
  I256
    Math
      ✔ Add (502ms)
        -------------
        🚗 safe 245
        🏎️ unsafe 132
        ⛽ saves 113 / 46%
      ✔ Sub
        -------------
        🚗 safe 242
        🏎️ unsafe 132
        ⛽ saves 110 / 45%
      ✔ Mul
        -------------
        🚗 safe 305
        🏎️ unsafe 134
        ⛽ saves 171 / 56%
      ✔ Div
        -------------
        🚗 safe 240
        🏎️ unsafe 147
        ⛽ saves 93 / 38%
      ✔ Mod (40ms)
        -------------
        🚗 safe 196
        🏎️ unsafe 147
        ⛽ saves 49 / 25%

  U256
    Math
      ✔ Add
        -------------
        🚗 safe 203
        🏎️ unsafe 132
        ⛽ saves 71 / 34%
      ✔ Sub
        -------------
        🚗 safe 203
        🏎️ unsafe 132
        ⛽ saves 71 / 34%
      ✔ Mul
        -------------
        🚗 safe 267
        🏎️ unsafe 134
        ⛽ saves 133 / 49%
      ✔ Div
        -------------
        🚗 safe 196
        🏎️ unsafe 147
        ⛽ saves 49 / 25%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 147
        ⛽ saves 49 / 25%

  UnsafeI256
    Math
      ✔ Add
        -------------
        🚗 safe 245
        🏎️ unsafe 147
        ⛽ saves 98 / 40%
      ✔ Sub
        -------------
        🚗 safe 242
        🏎️ unsafe 147
        ⛽ saves 95 / 39%
      ✔ Mul
        -------------
        🚗 safe 305
        🏎️ unsafe 149
        ⛽ saves 156 / 51%
      ✔ Div
        -------------
        🚗 safe 240
        🏎️ unsafe 162
        ⛽ saves 78 / 32%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 162
        ⛽ saves 34 / 17%

  Int256
    Math
      ✔ Add
        -------------
        🚗 safe 245
        🏎️ unsafe 84
        ⛽ saves 161 / 65%
      ✔ Sub
        -------------
        🚗 safe 242
        🏎️ unsafe 84
        ⛽ saves 158 / 65%
      ✔ Mul
        -------------
        🚗 safe 305
        🏎️ unsafe 86
        ⛽ saves 219 / 71%
      ✔ Div
        -------------
        🚗 safe 245
        🏎️ unsafe 84
        ⛽ saves 161 / 65%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 99
        ⛽ saves 97 / 49%
      ✔ Inc
        -------------
        🚗 safe 149
        🏎️ unsafe 72
        ⛽ saves 77 / 51%
      ✔ Dec
        -------------
        🚗 safe 149
        🏎️ unsafe 75
        ⛽ saves 74 / 49%

  Uint256
    Math
      ✔ Add
        -------------
        🚗 safe 203
        🏎️ unsafe 84
        ⛽ saves 119 / 58%
      ✔ Sub
        -------------
        🚗 safe 203
        🏎️ unsafe 84
        ⛽ saves 119 / 58%
      ✔ Mul
        -------------
        🚗 safe 267
        🏎️ unsafe 86
        ⛽ saves 181 / 67%
      ✔ Div
        -------------
        🚗 safe 196
        🏎️ unsafe 99
        ⛽ saves 97 / 49%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 99
        ⛽ saves 97 / 49%
      ✔ Exp
        -------------
        🚗 safe 435
        🏎️ unsafe 154
        ⛽ saves 281 / 64%
      ✔ Inc
        -------------
        🚗 safe 149
        🏎️ unsafe 72
        ⛽ saves 77 / 51%
      ✔ Dec
        -------------
        🚗 safe 149
        🏎️ unsafe 75
        ⛽ saves 74 / 49%
```
