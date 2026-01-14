interface Props {
  categories: string[]
  selected: string
  onChange: (value: string) => void
}

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}
