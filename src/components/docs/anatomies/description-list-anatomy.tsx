import { DescriptionList } from "ui"

export function DescriptionListAnatomy() {
  return (
    <DescriptionList>
      <DescriptionList.Term>Invoice Number</DescriptionList.Term>
      <DescriptionList.Details>INV-12345</DescriptionList.Details>
      <DescriptionList.Term>Invoice Date</DescriptionList.Term>
      <DescriptionList.Details>September 21, 2024</DescriptionList.Details>
    </DescriptionList>
  )
}
