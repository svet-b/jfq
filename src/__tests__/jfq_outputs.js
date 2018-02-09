/* eslint-env jest */

import {run, runStdin} from '../test-helper'

describe('output format', () => {
  describe('when the output is a single string', () => {
    it('prints it as an undecorated string', () => {
      return run('name', 'package.json')
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toBe('jfq')
        })
    })
  })

  describe('when the output is a single number', () => {
    it('prints it as an undecorated number', () => {
      const input = '{"num":42}'
      return runStdin(input, 'num')
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toBe('42')
        })
    })
  })

  describe('when the output is an array of string/number types', () => {
    it('prints each entry on a new line', () => {
      const input = '{"arr":[1,"foo"]}'
      return runStdin(input, 'arr')
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toBe('1\nfoo')
        })
    })
  })

  describe('when the output is an array with complex types', () => {
    it('prints JSON', () => {
      const data = {arr: [1, 'foo', [6]]}
      const input = JSON.stringify(data)
      const expected = JSON.stringify(data.arr, null, 2)
      return runStdin(input, 'arr')
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toBe(expected)
        })
    })
  })

  describe('default', () => {
    it('outputs as formatted JSON over multiple lines', () => {
      const data = {fake: [{json: 'data'}]}
      const input = JSON.stringify(data)
      const expected = JSON.stringify(data, null, 2)

      return runStdin(input)
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toEqual(expected)
        })
    })
  })

  describe('when the `-n` flag is specified', () => {
    it('outputs as formatted JSON', () => {
      const data = {fake: [{json: 'data'}]}
      const input = JSON.stringify(data)
      const expected = JSON.stringify(data)

      return runStdin(input, '-n')
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toEqual(expected)
        })
    })
  })

  describe('when the `-n` flag is specified with other options', () => {
    it('outputs as formatted JSON', () => {
      return run('-n', 'bugs', 'package.json')
        .then(res => {
          expect(res.error).toBeNull()
          expect(res.stderr).toBe('')
          expect(res.stdout).toEqual('{"url":"https://github.com/blgm/jfq/issues"}')
        })
    })
  })
})
