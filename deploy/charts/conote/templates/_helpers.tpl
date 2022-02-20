{{/*
Expand the name of the chart.
*/}}
{{- define "conote.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "conote.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "conote.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "conote.labels" -}}
helm.sh/chart: {{ include "conote.chart" . }}
{{ include "conote.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "conote.selectorLabels" -}}
app.kubernetes.io/name: {{ include "conote.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "conote.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "conote.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Postgresql service name
*/}}
{{- define "postgresql.serviceName" }}
{{- printf "%s-postgresql" .Release.Name }}
{{- end }}

{{/*
Conote database url to connect
*/}}
{{- define "conote.databaseUrl" -}}
{{- printf "postgresql://%s:%s@%s:%s/%s?schema=public" .Values.global.postgresql.auth.username .Values.global.postgresql.auth.password (include "postgresql.serviceName" .) .Values.global.postgresql.service.ports.postgresql .Values.global.postgresql.auth.database }}
{{- end }}

{{- define "conote.initContainers.dbReadyCommand" }}
{{- printf "until pg_isready -h %s -p %s -d %s -U %s; do echo waiting for database; sleep 2; done;" (include "postgresql.serviceName" .) .Values.global.postgresql.service.ports.postgresql .Values.global.postgresql.auth.database .Values.global.postgresql.auth.username }}
{{- end }}
