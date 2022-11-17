import React from 'react';
import BillingMgmt from "./BillingService";
import ConceptMgmt from "./ConceptManagement";
import PatientMgmt from "./PatientManagement";
import { GridContainer, GridItem } from '../../components';
import Inventory from "./Inventory"
export default function SystemAdmin() {
  return (
    <GridContainer>
      <GridItem item ><BillingMgmt/></GridItem>
      <GridItem item ><ConceptMgmt/></GridItem>
      <GridItem item ><PatientMgmt/></GridItem>
      <GridItem item ><Inventory/></GridItem>
    </GridContainer>
  );
}
