import { create } from 'zustand'
import anecdoteService from './services/anecdote'

const useAnecdoteStore = create((set, get) => ({
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
    voteOf: async (id) => {

      const anecdoteToChange = get().anecdotes.find((a) => a.id === id)

      if (!anecdoteToChange) return


      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }

      const returnedAnecdote = await anecdoteService.update(id, updatedAnecdote)

      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          a.id !== id ? a : returnedAnecdote
        ),
      }))
    },
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useSetFilter = () => useAnecdoteStore((state) => state.actions.setFilter)
export const useVoteOf = () => useAnecdoteStore((state) => state.actions.voteOf)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)