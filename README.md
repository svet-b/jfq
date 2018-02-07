[![npm](https://img.shields.io/npm/v/jfq.svg)](https://www.npmjs.com/package/jfq)
[![Build Status](https://travis-ci.org/blgm/jfq.svg?branch=master)](https://travis-ci.org/blgm/jfq)
[![Dependencies](https://david-dm.org/blgm/jfq.svg)](https://david-dm.org/blgm/jfq)

# jfq
[JSONata](http://jsonata.org/) on the command line.

This was inspired by the excellent [jq](https://stedolan.github.io/jq/) utility, and uses JSONata rather than the
`jq` language.  It is an early prototype and breaking changes are probable.

## Installation
```
npm install --global jfq
```

## Usage
```
jfq [-n, --ndjson] [<JSONata query>] [<files>]
```

It is good practice to put the JSONata query in single quotes, so that the shell does
not attempt to interpret it.

## Examples
- To read the version of JSONata from the file `package.json`:
```
jfq 'dependencies.jsonata' package.json

# "^1.5.0"
```

- To find out how many downloads of JSONata there have been each month in the past year:
```
curl -s \
  https://api.npmjs.org/downloads/range/last-year/jsonata \
  | jfq 'downloads{$substring(day, 0, 7): $sum(downloads)}'

# {
#  "2017-02": 36216,
#  "2017-03": 46460,
#  "2017-04": 40336,
#  ...
# }
```
