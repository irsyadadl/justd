"use client"

import { Card, DescriptionList, Link, buttonStyles } from "ui"

export default function DescriptionListCardDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Product Details</Card.Title>
        <Card.Description>
          The product details card is a great way to display information about a product.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <DescriptionList>
          <DescriptionList.Term>Product Name</DescriptionList.Term>
          <DescriptionList.Details>Wireless Headphones</DescriptionList.Details>
          <DescriptionList.Term>Battery Life</DescriptionList.Term>
          <DescriptionList.Details>20 hours</DescriptionList.Details>
          <DescriptionList.Term>Weight</DescriptionList.Term>
          <DescriptionList.Details>250 grams</DescriptionList.Details>
          <DescriptionList.Term>Color</DescriptionList.Term>
          <DescriptionList.Details>Black</DescriptionList.Details>
          <DescriptionList.Term>Warranty</DescriptionList.Term>
          <DescriptionList.Details>2 years</DescriptionList.Details>
        </DescriptionList>
      </Card.Content>
      <Card.Footer>
        <Link className={buttonStyles()} href="#">
          Edit
        </Link>
      </Card.Footer>
    </Card>
  )
}
