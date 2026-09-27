import { useAnecdotes, useFilter, useVoteOf, useAnecdoteActions } from '../store'
import { useSetNotification } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const voteOf = useVoteOf()
  const { remove } = useAnecdoteActions()
  const setNotification = useSetNotification()

  const handleVote = (anecdote) => {
    voteOf(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`, 5)
  }

  const handleDelete = async (anecdote) => {
    await remove(anecdote.id)
    setNotification(`deleted '${anecdote.content}'`, 5)
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList