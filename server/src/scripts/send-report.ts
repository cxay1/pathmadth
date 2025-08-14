#!/usr/bin/env ts-node

import { sendReportNow } from '../utils/sendReport';

// Execute the email sending
sendReportNow()
  .then(() => {
    console.log('Authentication setup report has been sent to info.pathmatch@gmail.com');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to send report:', error);
    process.exit(1);
  });