import { useFeedbackStore } from '../useFeedbackStore'

const StatisticLine = ({ text, value, symbol = '' }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {symbol}</td>
  </tr>
)

const Statistics = () => {
  const good = useFeedbackStore((state) => state.good)
  const neutral = useFeedbackStore((state) => state.neutral)
  const bad = useFeedbackStore((state) => state.bad)

  const total = good + neutral + bad

  if (total === 0) {
    return <div>No feedback given</div>
  }

  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={positive.toFixed(2)} symbol="%" />
      </tbody>
    </table>
  )
}

export default Statistics