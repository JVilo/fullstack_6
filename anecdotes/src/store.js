import { create } from 'zustand'
import anecdoteService from './services/anecdote'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: (filterText) => set({ filter: filterText }),
    voteOf: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        ),
      })),
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useSetFilter = () => useAnecdoteStore((state) => state.actions.setFilter)
export const useVoteOf = () => useAnecdoteStore((state) => state.actions.voteOf)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)