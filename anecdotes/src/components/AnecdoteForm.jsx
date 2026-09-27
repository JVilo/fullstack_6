import { useAnecdoteActions } from '../store'
import { useSetNotification } from '../notificationStore'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const setNotification = useSetNotification()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await add(content)
    setNotification(`you created '${content}'`, 5)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm