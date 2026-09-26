import { useAnecdotes, useVoteOf } from './store'
import AnecdoteForm from './AnecdoteForm'

const App = () => {
  const anecdotes = useAnecdotes()
  const voteOf = useVoteOf()

  const handleVote = (id) => {
    voteOf(id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App