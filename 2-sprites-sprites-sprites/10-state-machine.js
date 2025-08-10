// State Machine ⚙️
// Codédex

/*
                               ┌─────────┐
                               │  idle   │
                               │(no move)│
                               └─────────┘
                              ▲    ▲    ▲    ▲
         any arrow key press  │    │    │    │
                              │    │    │    │
        ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
        │ walk-up (↑)  │   │ walk-down (↓)│   │ walk-left(←) │   │ walk-right(→)│
        └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
               │                  │                 │                 │
               │                  │                 │                 │
               └──────────────────┴─────────────────┴─────────────────┘
                               key + run button pressed
                                         │
                                     ┌────────┐
                                     │  run   │
                                     │ (faster│
                                     │ movement)
                                     └────────┘
                                         │
                              ┌──────────┴────────────┐
                              │                       │
                 ┌────────────▼──────────┐  ┌─────────▼─────────┐
                 │      attack           │  │    cast-spell     │
                 │ (interrupts movement) │  │ (magic animation) │
                 └────────────▲──────────┘  └─────────▲─────────┘
                              │                       │
                    attack/cast animation done      cast done
                              │                       │
                              ▼                       ▼
                          previous                   previous
                          state                     state
                              │                       │
                              └─────────────┬─────────┘
                                            │
                                     ┌──────▼─────┐
                                     │ interact   │
                                     │ (talk/open │
                                     │  pickup)   │
                                     └──────▲─────┘
                                            │
                         interaction done   │
                                            │
                                            ▼

                  ┌────────────┐          ┌───────────┐
                  │  stunned   │◀─────────┤   hurt    │
                  │(no control)│          │ (hit flash)│
                  └────────────┘          └───────────┘
                       ▲                        │
                       │                        │
                    stunned done           damage taken
                       │                        │
                       └─────────────┬──────────┘
                                     │
                                  ┌──▼───┐
                                  │ dead │
                                  │(game │
                                  │ over)│
                                  └──▲───┘
                                     │
                                 player respawn
                                     │
                                ┌────▼────┐
                                │ respawn │
                                │ (re-entry)
                                └─────────┘
                                     │
                                     ▼
                                   idle


*/