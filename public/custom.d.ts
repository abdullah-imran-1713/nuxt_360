interface XMLHttpRequestProgressEvent extends ProgressEvent {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}
