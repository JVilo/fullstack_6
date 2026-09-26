import { useAnecdotes, useVoteOf } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const voteOf = useVoteOf()

  const handleVote = (id) => {
    voteOf(id)
  }
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList