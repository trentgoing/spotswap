# Spot Swap

> Ever wish you could be tipped off when someone was about to leave their parking spot?  Ever wished you could sell the information that you are about to leave your parking spot?   
Use #Spot Swap# to look for parking spots that are about to open up, or to exchange your current spot with other users!



## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
[spotswap.io](http://www.spotswap.io)
1. Pin and post open spots
![](demo/addSpotted.gif)

> Some usage instructions

## Team

  - __Development Team__: Trent Going, Sarah Gujadhur, Milton Lopez, 

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

| Name             | Service | Container | Tech                 |
|------------------|---------|-----------|----------------------|
| Web              | Web     | web       | React, React-Router  |
| Spots API        | Spots   | spots     | Node, Express        |
| Spots DB         | Spots   | spots-db  | Postgres             |
| Swagger          | Spots   | swagger   | Swagger UI           |
| Users API        | Users   | users     | Node, Express GQL    |
| Users DB         | Users   | users-db  | Postgres             |
| Functional Tests | Test    | n/a       | TestCafe             |

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.