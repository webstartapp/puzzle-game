/* eslint-disable */
interface Query {
  getMetrics: GetMetrics;
}
interface GetMetrics {
  metric: Metric;
  generalStatsGroup: GeneralStatsGroup[];
}
interface Metric {
  metricId: MetricEnum;
  labels: string[];
  kpiGroup: KPIGroup[];
}
export type MetricEnum =
  | "AA_DTN_LE60"
  | "AA_DTN_LE45"
  | "AA_DTG_LE120"
  | "AA_DTG_LE90"
  | "AA_RECANALIZATION"
  | "AA_IMAGING"
  | "AA_SWALLOWING_SCREENING"
  | "AA_ANTICOAGULANTS"
  | "AA_ANTITHROMBOTICS"
  | "AA_STROKE_UNIT"
  | "AGE"
  | "WAKEUP_STROKE"
  | "INHOSPITAL_STROKE"
  | "ARRIVAL_MODE"
  | "EMS_PRENOTIFICATION"
  | "ADMISSION_DEPARTMENT"
  | "FIRST_CONTACT_PLACE"
  | "HOSPITALIZED_IN"
  | "SEX"
  | "RISK_FACTORS_TYPE"
  | "BEFORE_ONSET_MEDICATION"
  | "BEFORE_ONSET_MEDICATION_AIS_TIA"
  | "BEFORE_ONSET_MEDICATION_ICH"
  | "BEFORE_ONSET_ANTIPLATELET_TYPE"
  | "BEFORE_ONSET_ANTICOAGULANT_TYPE"
  | "ADMISSION_NIHSS"
  | "PRESTROKE_MRS"
  | "GLUCOSE"
  | "CHOLESTEROL"
  | "SYSTOLIC_PRESSURE"
  | "DIASTOLIC_PRESSURE"
  | "INR_MODE"
  | "IMAGING_DONE"
  | "IMAGING_TYPE"
  | "OCCLUSION_FOUND"
  | "OCCLUSION_SITE"
  | "OLD_INFARCTS_SEEN"
  | "OLD_INFARCTS_TYPE"
  | "PERFUSION_CORE"
  | "HYPOPERFUSION"
  | "STROKE_TYPE"
  | "STROKE_MIMICS_DIAGNOSIS"
  | "THROMBOLYSIS"
  | "THROMBECTOMY"
  | "THROMBECTOMY_ONLY"
  | "THROMBOLYSIS_ONLY"
  | "THROMBOLYSIS_AND_THROMBECTOMY"
  | "RECANALIZATION"
  | "DTN"
  | "DTG_PRIMARY"
  | "DTG_SECONDARY"
  | "DIDO"
  | "MTICI_SCORE"
  | "NO_THROMBOLYSIS_REASON"
  | "NO_THROMBECTOMY_REASON"
  | "MT_COMPLICATIONS_TYPE"
  | "MT_COMPLICATIONS"
  | "THROMBOLYSIS_DRUGS"
  | "POST_RECANALIZATION_BLEEDING"
  | "POST_RECANALIZATION_FINDINGS"
  | "BLEEDING_SOURCE_FOUND"
  | "ICH_BLEEDING_VOLUME"
  | "ICH_SCORE"
  | "ICH_TREATMENT"
  | "ICH_TREATMENT_TYPE"
  | "BLEEDING_REASON_FOUND"
  | "BLEEDING_REASON_TYPE"
  | "INTRAVENTICULAR_HEMORRHAGE"
  | "INFRATENTORIAL_HEMORRHAGE"
  | "SAH_TREATMENT"
  | "SAH_TREATMENT_TYPE"
  | "HUNT_HESS_SCORE"
  | "CVT_TREATMENT"
  | "CVT_TREATMENT_TYPE"
  | "POST_ACUTE_CARE"
  | "CRANIECTOMY"
  | "CRANIECTOMY_AGE_GT60"
  | "CAROTID_ARTERIES_IMAGING"
  | "CAROTID_STENOSIS"
  | "CAROTID_STENOSIS_LEVEL"
  | "CAROTID_ENDARTERECTOMY"
  | "CAROTID_ENDARTERECTOMY_STENOSIS_GT70"
  | "ATRIAL_FIBRILATION_FLUTTER"
  | "STROKE_ETIOLOGY_KNOWN_AIS"
  | "STROKE_ETIOLOGY_TYPE_AIS"
  | "STROKE_ETIOLOGY_KNOWN_AIS_TIA"
  | "STROKE_ETIOLOGY_TYPE_AIS_TIA"
  | "VTE_INTERVENTION_AIS"
  | "VTE_INTERVENTION_ICH"
  | "VTE_INTERVENTION_TYPE_AIS"
  | "VTE_INTERVENTION_TYPE_ICH"
  | "POST_STROKE_COMPLICATIONS"
  | "POST_STROKE_COMPLICATIONS_TYPE"
  | "DAY_1_TEMPERATURE_CHECKS"
  | "DAY_2_TEMPERATURE_CHECKS"
  | "DAY_3_TEMPERATURE_CHECKS"
  | "PARACETAMOL_ON_FEVER"
  | "DAY_1_HYPERGLYCEMIA_CHECKS"
  | "DAY_2_HYPERGLYCEMIA_CHECKS"
  | "DAY_3_HYPERGLYCEMIA_CHECKS"
  | "INSULIN_ON_HYPERGLYCEMIA"
  | "SWALLOWING_SCREENING"
  | "NIMODIPINE"
  | "SWALLOWING_SCREENING_TYPE"
  | "SWALLOWING_SCREENING_PERFORMER"
  | "PHYSIOTHERAPY"
  | "OCCUPATIONAL_THERAPY"
  | "SPEECH_THERAPY"
  | "DISCHARGE_DESTINATION"
  | "DISCHARGE_MEDICATIONS"
  | "DISCHARGE_ANTICOAGULANTS_AFIB"
  | "DISCHARGE_ANTICOAGULANT_TYPE_AFIB"
  | "DISCHARGE_ANTIPLATELETS_NO_AFIB"
  | "DISCHARGE_ANTIPLATELET_TYPE_NO_AFIB"
  | "DISCHARGE_MRS"
  | "SMOKING_CESSATION"
  | "STROKE_MANAGEMENT_APPOINTMENT"
  | "THREE_MONTH_MRS"
  | "HOSPITAL_STAY"
  | "DISCHARGE_NIHSS"
  | "DTI"
  | "ONSET_TO_DOOR"
  | "TIA_CLINICAL_SYMPTOMS"
  | "TIA_SYMPTOMS_DURATION"
  | "THROMBOLYSIS_DRUG_DOSE"
  | "PERFUSION_DEFICIT_TYPE"
  | "POST_RECANALIZATION_FINDING_TYPE";
interface KPIGroup {
  timePeriod: TimePeriod;
  dataOrigin: DataOrigin;
  groupedBy: GroupedBy;
  kpi: KPI;
}
interface TimePeriod {
  startDate: string;
  endDate: string;
}
interface DataOrigin {
  providerId: number;
  providerGroupId: number;
}
interface GroupedBy {
  group: Group;
  groupItemId: number;
  groupItemName: string;
}
export type Group = "EMS_PRENOTIFICATION" | "FIRST_CONTACT_PLACE" | "IVT_APPLICATION_DEPARTMENT" | "INR_MODE";
interface KPI {
  kpiOptions: KPIOptions;
  caseCount: number[];
  percents: number[];
  normalizedPercents: number[];
  cohortSize: number;
  normalizedCohortSize: number[];
  median: number;
  mean: number;
  variance: number;
  confidenceIntervalMedian: number[];
  confidenceIntervalMean: number[];
  interquartileRange: number;
  quartiles: number[];
  distribution: Distribution;
}
interface KPIOptions {
  lowerBoundary: number;
  upperBoundary: number;
}
interface Distribution {
  edges: number[];
  caseCount: number[];
  percents: number[];
  normalizedPercents: number[];
}
interface GeneralStatsGroup {
  timePeriod: TimePeriod;
  dataOrigin: DataOrigin;
  generalStatistics: GeneralStatistics;
}
interface GeneralStatistics {
  casesInPeriod: number;
  filteredCasesInPeriod: number;
}
export type SexEnum = "MALE" | "FEMALE" | "OTHER" | "UNKNOWN";
export type StrokeTypeEnum =
  | "ISCHEMIC"
  | "INTRACEREBRAL_HEMORRHAGE"
  | "TRANSIENT_ISCHEMIC"
  | "SUBARACHNOID_HEMORRHAGE"
  | "CEREBRAL_VENOUS_THROMBOSIS"
  | "STROKE_MIMICS"
  | "UNDETERMINED";
export type LookUp = "GT" | "LT" | "GE" | "LE" | "EQ" | "NE";
interface __Schema {
  description: string;
  types: __Type;
  queryType: __Type;
  mutationType: __Type;
  subscriptionType: __Type;
  directives: __Directive;
}
interface __Type {
  kind: __TypeKind;
  name: string;
  description: string;
  specifiedByURL: string;
  fields: __Field[];
  interfaces: __Type[];
  possibleTypes: __Type[];
  enumValues: __EnumValue[];
  inputFields: __InputValue[];
  ofType: __Type;
}
export type __TypeKind = "SCALAR" | "OBJECT" | "INTERFACE" | "UNION" | "ENUM" | "INPUT_OBJECT" | "LIST" | "NON_NULL";
interface __Field {
  name: string;
  description: string;
  args: __InputValue;
  type: __Type;
  isDeprecated: boolean;
  deprecationReason: string;
}
interface __InputValue {
  name: string;
  description: string;
  type: __Type;
  defaultValue: string;
  isDeprecated: boolean;
  deprecationReason: string;
}
interface __EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
}
interface __Directive {
  name: string;
  description: string;
  isRepeatable: boolean;
  locations: __DirectiveLocation;
  args: __InputValue;
}
export type __DirectiveLocation =
  | "QUERY"
  | "MUTATION"
  | "SUBSCRIPTION"
  | "FIELD"
  | "FRAGMENT_DEFINITION"
  | "FRAGMENT_SPREAD"
  | "INLINE_FRAGMENT"
  | "VARIABLE_DEFINITION"
  | "SCHEMA"
  | "SCALAR"
  | "OBJECT"
  | "FIELD_DEFINITION"
  | "ARGUMENT_DEFINITION"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "ENUM_VALUE"
  | "INPUT_OBJECT"
  | "INPUT_FIELD_DEFINITION";
export type GetMetricsType = GetMetrics;
export type GetQueryType = Query;
export type TimePeriodType = TimePeriod;
export type KPIType = KPI;
export type KPIOptionsType = KPIOptions;
export type MetricType = Metric;
export type DataOriginType = DataOrigin;
export type GeneralStatisticsType = GeneralStatistics;
export type DistributionType = Distribution;
export type GroupByType = Group;
