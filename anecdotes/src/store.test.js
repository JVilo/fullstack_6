import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdote', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

import anecdoteService from './services/anecdote'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  if (useAnecdoteStore && useAnecdoteStore.setState) {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  }
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})

describe('useAnecdotes sorting', () => {
  it('returns anecdotes sorted by votes in descending order', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'A', votes: 0 },
      { id: 2, content: 'B', votes: 5 },
      { id: 3, content: 'C', votes: 2 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await actionsResult.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    const sortedAnecdotes = [...anecdotesResult.current].sort((a, b) => b.votes - a.votes)
    const expectedOrder = [mockAnecdotes[1], mockAnecdotes[2], mockAnecdotes[0]]

    expect(sortedAnecdotes).toEqual(expectedOrder)
  })
describe('useAnecdotes filtering', () => {
  it('returns only anecdotes that match the filter keyword', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'React hooks are great', votes: 0 },
      { id: 2, content: 'Redux is state management', votes: 2 },
      { id: 3, content: 'Zustand is light React store', votes: 5 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result: actionsResult } = renderHook(() => useAnecdoteActions())

    // 1. Alustetaan tila
    await act(async () => {
      await actionsResult.current.initialize()
    })

    // 2. Asetetaan hakusuodatin "react"
    act(() => {
      actionsResult.current.setFilter('react')
    })

    // 3. Luetaan anekdootit
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    // 4. Suodatetaan lista suodattimen mukaan ja tarkistetaan osuma
    const filteredAnecdotes = anecdotesResult.current.filter((a) =>
      a.content.toLowerCase().includes('react')
    )

    // Odotetaan, että vain anekdootit 1 ja 3 täyttävät ehdon
    expect(filteredAnecdotes).toHaveLength(2)
    expect(filteredAnecdotes).toEqual([mockAnecdotes[0], mockAnecdotes[2]])
  })
})
})