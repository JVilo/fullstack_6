import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.trim()) {
      addAnecdote(content)
      dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${content}' created` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm