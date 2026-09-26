import { useFeedbackStore } from '../useFeedbackStore'

const StatisticLine = ({ text, value, symbol = '' }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{symbol ? ` ${symbol}` : ''}</td>
  </tr>
)

const Statistics = () => {
  const good = useFeedbackStore((state) => state.good)
  const neutral = useFeedbackStore((state) => state.neutral)
  const bad = useFeedbackStore((state) => state.bad)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} symbol="%" />
      </tbody>
    </table>
  )
}

export default Statistics