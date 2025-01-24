import { Button, Card } from "ui"

export default function CardAnatomy() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Monthly Report</Card.Title>
        <Card.Description>Financial summary for June</Card.Description>
      </Card.Header>
      <Card.Content>...</Card.Content>
      <Card.Footer>
        <Button>View Details</Button>
      </Card.Footer>
    </Card>
  )
}
