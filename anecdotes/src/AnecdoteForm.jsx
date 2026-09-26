import { useAnecdoteActions } from './store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add(content)
    e.target.reset()
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" data-testid="new" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm