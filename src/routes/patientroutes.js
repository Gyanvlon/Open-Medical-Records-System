import {
  ManagePatients,
  FindPatients,
  ManageIdentifierTypes,
  ManagePatientIdentifierSources,
  AutoGenerationOptions,
  ViewLogEntries,
  ManagePatientConsentForms,
} from "../pages/SystemAdministration/PatientManagement/components";

/**
 * list of available routes for the entire application.
 */
export const patientRoutes = [
  {
    path: "/manage_patients",
    title: "Manage Patients",
    roles: ["*"],
    component: ManagePatients,
    layout: "/app",
  }, {
    path: "/find_patients",
    title: "Find Patients to Merge",
    roles: ["*"],
    component: FindPatients,
    layout: "/app",
  }, {
    path: "/manage_identifier_types",
    title: "Manage Identifier Types",
    roles: ["*"],
    component: ManageIdentifierTypes,
    layout: "/app",
  }, {
    path: "/manage_patient_identifier_sources",
    title: "Manage Patient Identifier Sources",
    roles: ["*"],
    component: ManagePatientIdentifierSources,
    layout: "/app",
  }, {
    path: "/auto_generation_options",
    title: "Auto-Generation Options",
    roles: ["*"],
    component: AutoGenerationOptions,
    layout: "/app",
  }, {
    path: "/view_log_entries",
    title: "View Log Entries",
    roles: ["*"],
    component: ViewLogEntries,
    layout: "/app",
  }, {
    path: "/patient_consent_forms",
    title: "Patient Consent Form",
    roles: ["*"],
    component: ManagePatientConsentForms,
    layout: "/app",
  },
];

