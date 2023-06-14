![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Through the Eyes of the AI Color Thief

Steal colors from images with the help of ColorThief package.

## Prerequisites

- Node.js
- Docker

## Installation

```bash
npm ci
```

## Usage or Deployment

Deploy as Docker container. Listens on port 3000.

Body property `dataUrl` is required.

Body property `numberOfColors` is optional. Default is 5. min 1 max 10

```bash
$ curl --request POST \
  --url http://localhost:3000/ \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{"numberOfColors": 3, "dataUrl":"data:image/png;base64,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"}'

  # will return the

HTTP/1.1
201
Created
content-type:
application/json; charset=utf-8
content-length:
115
date:
Wed, 14 Jun 2023 12:43:30 GMT
connection:
close
{
  "color": [
    4,
    252,
    128
  ],
  "palette": [
    [
      4,
      169,
      169
    ],
    [
      252,
      4,
      110
    ],
    [
      252,
      252,
      4
    ]
  ],
  "names": [
    "lightseagreen",
    "deeppink",
    "yellow"
  ]
}
```

## Development

npm run dev

## Tests

```bash
npm t
```

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

<table>
  <tr>
    <td>
      Made by <a href="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://citylab-berlin.org/wp-content/uploads/2021/05/citylab-logo.svg" />
      </a>
    </td>
    <td>
      A project by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://citylab-berlin.org/wp-content/uploads/2021/05/tsb.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>

## Related Projects

- [github.com/technologiestiftung/eyes-of-ai](https://github.com/technologiestiftung/eyes-of-ai)
