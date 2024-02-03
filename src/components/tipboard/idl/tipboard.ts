export type Tipboard = {
  "version": "0.1.0",
  "name": "tip_board",
  "instructions": [
    {
      "name": "initializeTipboard",
      "accounts": [
        {
          "name": "tipboardAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tipboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addTip",
      "accounts": [
        {
          "name": "tipboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "solUsdPriceAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK : We will manually check this against the Pubkey of the price feed"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "timestamp",
          "type": "i64"
        },
        {
          "name": "nftMint",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "TipboardAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tipboards",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "Tipboard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "tips",
            "type": {
              "vec": {
                "defined": "Tip"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Tip",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tipper",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "nftMint",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "WrongSigner",
      "msg": "Signer does not match player."
    },
    {
      "code": 6002,
      "name": "TipboardFull",
      "msg": "Tipboard is full."
    },
    {
      "code": 6003,
      "name": "WrongPriceFeedId",
      "msg": "Price feed id is not correct."
    }
  ],
  "metadata": {
    "address": "7vZPMfghSw2rQWhvCs1XW6CDLunP36jB253bQVWWMUmu"
  }
}
  
  export const IDL: Tipboard = {
    "version": "0.1.0",
    "name": "tip_board",
    "instructions": [
      {
        "name": "initializeTipboard",
        "accounts": [
          {
            "name": "tipboardAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tipboard",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "addTip",
        "accounts": [
          {
            "name": "tipboard",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "to",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "solUsdPriceAccount",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "CHECK : We will manually check this against the Pubkey of the price feed"
            ]
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "nftMint",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "TipboardAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "tipboards",
              "type": {
                "vec": "publicKey"
              }
            }
          ]
        }
      },
      {
        "name": "Tipboard",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "tips",
              "type": {
                "vec": {
                  "defined": "Tip"
                }
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "Tip",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "tipper",
              "type": "publicKey"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "timestamp",
              "type": "i64"
            },
            {
              "name": "nftMint",
              "type": "string"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "Unauthorized",
        "msg": "You are not authorized to perform this action."
      },
      {
        "code": 6001,
        "name": "WrongSigner",
        "msg": "Signer does not match player."
      },
      {
        "code": 6002,
        "name": "TipboardFull",
        "msg": "Tipboard is full."
      },
      {
        "code": 6003,
        "name": "WrongPriceFeedId",
        "msg": "Price feed id is not correct."
      }
    ],
    "metadata": {
      "address": "7vZPMfghSw2rQWhvCs1XW6CDLunP36jB253bQVWWMUmu"
    }
  }