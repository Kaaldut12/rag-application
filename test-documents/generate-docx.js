import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  Header,
  Footer,
  PageNumber,
  ShadingType,
} from 'docx'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(__dirname, 'RAG_Test_Knowledge_Base.docx')

// Reusable styling helpers
const tableBorder = {
  style: BorderStyle.SINGLE,
  size: 6,
  color: 'CBD5E1',
}

const tableBorders = {
  top: tableBorder,
  bottom: tableBorder,
  left: tableBorder,
  right: tableBorder,
  insideHorizontal: tableBorder,
  insideVertical: tableBorder,
}

function cell(text, isHeader = false, widthPct = 25) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: isHeader
      ? { type: ShadingType.CLEAR, fill: '1E293B' }
      : { type: ShadingType.CLEAR, fill: 'F8FAFC' },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: isHeader,
            color: isHeader ? 'FFFFFF' : '0F172A',
            size: isHeader ? 21 : 20,
            font: 'Arial',
          }),
        ],
      }),
    ],
  })
}

function scenarioCell(label, value, widthPct = 50) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: label + ': ', bold: true, color: '1E293B', size: 19, font: 'Arial' }),
          new TextRun({ text: value, color: '334155', size: 19, font: 'Arial' }),
        ],
      }),
    ],
  })
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 21, color: '1E293B' },
        paragraph: { spacing: { after: 140, line: 276 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: 'BrightPath Learning — RAG Testing Knowledge Base',
                  color: '64748B',
                  size: 17,
                  font: 'Arial',
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'Page ', color: '64748B', size: 18 }),
                new TextRun({ children: [PageNumber.CURRENT], color: '64748B', size: 18 }),
                new TextRun({ text: ' of ', color: '64748B', size: 18 }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], color: '64748B', size: 18 }),
              ],
            }),
          ],
        }),
      },
      children: [
        // Title Block
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: 'BrightPath Learning — RAG Testing Knowledge Base',
              bold: true,
              size: 44,
              color: '0F172A',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: 'Official Operational, Academic, and Technical Policy Handbook (Standard Test Document v1.0)',
              color: '2563EB',
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 260 },
          children: [
            new TextRun({
              text: 'Note for Evaluators: ',
              bold: true,
              color: '0F172A',
            }),
            new TextRun({
              text: 'BrightPath Learning is a fictional educational organization created specifically to validate document upload, text extraction, semantic chunk retrieval, grounding accuracy, and AI question-answering systems. All figures, schedules, and scenarios herein serve as authoritative ground truth.',
              italics: true,
              color: '475569',
            }),
          ],
        }),

        // Section 1: Company Information
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: '1. Company Information', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Organization Name: ', bold: true }),
            new TextRun({ text: 'BrightPath Learning' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Year Founded: ', bold: true }),
            new TextRun({ text: '2021' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Corporate Mission: ', bold: true }),
            new TextRun({
              text: 'Make practical technology education accessible to beginners through hands-on curriculum, structured mentorship, and industry-aligned skill tracks.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Support Operating Hours: ', bold: true }),
            new TextRun({
              text: 'Monday–Friday, 9:00 AM–5:00 PM IST (Indian Standard Time). Support operations are paused on Indian national holidays and weekends.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headquarters Location: ', bold: true }),
            new TextRun({ text: 'Bengaluru, Karnataka, India' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Official Support Contact: ', bold: true }),
            new TextRun({ text: 'support@brightpathlearning.in' }),
          ],
        }),

        // Section 2: Course Catalog
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '2. Course Catalog & Curricular Structure', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'BrightPath Learning offers three core vocational tracks. All courses include live mentorship sessions, hands-on homework assignments, and an end-of-course capstone portfolio project.',
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Course Name', true, 28),
                cell('Duration', true, 14),
                cell('Course Fee (INR)', true, 18),
                cell('Curriculum & Core Topics', true, 40),
              ],
            }),
            new TableRow({
              children: [
                cell('Web Development Foundations', false, 28),
                cell('8 weeks', false, 14),
                cell('₹7,500', false, 18),
                cell('HTML5 semantic structure, modern CSS3 layout & Flexbox/Grid, JavaScript ES6+, React 19 component architecture, Node.js runtime, Express backend services, and REST APIs.', false, 40),
              ],
            }),
            new TableRow({
              children: [
                cell('Data Analytics Essentials', false, 28),
                cell('6 weeks', false, 14),
                cell('₹6,000', false, 18),
                cell('Advanced spreadsheets & lookup functions, relational SQL querying (joins, aggregations, subqueries), data cleaning techniques, interactive BI dashboards, and descriptive statistics.', false, 40),
              ],
            }),
            new TableRow({
              children: [
                cell('Cloud Fundamentals', false, 28),
                cell('4 weeks', false, 14),
                cell('₹4,000', false, 18),
                cell('Cloud computing paradigms, Identity and Access Management (IAM), virtual machines & VPC networking, container basics, and automated cloud application deployment.', false, 40),
              ],
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 140, after: 80 },
          children: [
            new TextRun({ text: 'Course-Specific Projects & Assignment Requirements:', bold: true }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Web Development Foundations: ', bold: true }),
            new TextRun({ text: 'Requires 4 graded assignments and 1 capstone project (Personal Portfolio & Task Management REST API). Total learning commitment: 120 hours.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Data Analytics Essentials: ', bold: true }),
            new TextRun({ text: 'Requires 3 graded assignments and 1 capstone project (Retail Sales Performance & Churn Dashboard). Total learning commitment: 80 hours.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Cloud Fundamentals: ', bold: true }),
            new TextRun({ text: 'Requires 2 graded assignments and 1 capstone project (Multi-Tier Web Application Cloud Deployment). Total learning commitment: 45 hours.' }),
          ],
        }),

        // Section 3: Refund Policy
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '3. Student Refund & Cancellation Policy', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'BrightPath Learning provides a transparent, consumer-friendly refund policy to guarantee learner confidence.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '1. Window for Request: ', bold: true }),
            new TextRun({ text: 'Students can request a full refund within exactly 7 calendar days of their initial payment timestamp.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '2. Eligibility Criteria: ', bold: true }),
            new TextRun({ text: 'To qualify for a full refund, the enrolled student must have completed no more than one lesson in the course and must have submitted no graded assignments.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '3. Disqualification: ', bold: true }),
            new TextRun({ text: 'If a student has completed two or more lessons, or has submitted even one graded assignment, the enrollment becomes strictly non-refundable regardless of whether 7 calendar days have elapsed.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '4. Processing Timeline: ', bold: true }),
            new TextRun({ text: 'Approved refunds are credited back to the original payment source within 5–7 business days following administrative approval.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '5. Mandatory Request Information: ', bold: true }),
            new TextRun({ text: 'Every refund submission must explicitly provide: (a) Registered student email address, (b) Exact course name, (c) Date of payment, and (d) Payment transaction reference ID (e.g., TXN-WD-88412).' }),
          ],
        }),

        // Section 4: Certificate Policy
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '4. Certificate Issuance Policy', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'BrightPath Learning awards verifiable, industry-recognized digital credentials upon meeting academic standards.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Lesson Completion Requirement: ', bold: true }),
            new TextRun({ text: 'Students must complete at least 80% of all scheduled course lessons and interactive modules.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Assessment Score Requirement: ', bold: true }),
            new TextRun({ text: 'Students must score at least 60% on the comprehensive final course assessment.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Issuance Turnaround: ', bold: true }),
            new TextRun({ text: 'Certificates are issued digitally via secure download within 2 business days after academic verification is complete.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Retake Allowance: ', bold: true }),
            new TextRun({ text: 'Students scoring below 60% are granted one free assessment retake after a mandatory 7-calendar-day study period.' }),
          ],
        }),

        // Section 5: Assignment Policy
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '5. Assignment Submission & Grading Policy', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Standard Review Turnaround: ', bold: true }),
            new TextRun({ text: 'The normal assignment review and grading turnaround time is 3 business days from submission.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Late Submissions (Up to 3 Days): ', bold: true }),
            new TextRun({ text: 'Assignments submitted up to 3 calendar days after the stated deadline receive a flat 10% score deduction (e.g., an 85% paper becomes 76.5%).' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Excessive Late Submissions (>3 Days): ', bold: true }),
            new TextRun({ text: 'Assignments submitted later than 3 calendar days past the deadline receive zero credit unless an explicit instructor exception has been approved in writing prior to the cutoff.' }),
          ],
        }),

        // Section 6: Technical Support
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '6. Technical Support & Platform Guidelines', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Authentication & Login Issues: ', bold: true }),
            new TextRun({ text: 'Verify the registered email spelling and use the automated "Forgot Password" link on the portal. If locked out, contact support.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Critical Security Protocol: ', bold: true, color: 'B91C1C' }),
            new TextRun({ text: 'BrightPath Learning support staff never ask for user passwords or One-Time Passwords (OTPs) under any circumstance. Never disclose your security credentials.', bold: true, color: 'B91C1C' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Video Playback Troubleshooting: ', bold: true }),
            new TextRun({ text: 'Refresh the browser tab, check your internet connectivity (minimum recommended download speed: 5 Mbps), disable conflicting ad-blockers, and ensure your browser (Chrome, Edge, or Firefox) is updated.' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Normal Support Response Target: ', bold: true }),
            new TextRun({ text: '1 business day for standard inquiry tickets submitted through support@brightpathlearning.in.' }),
          ],
        }),

        // Section 7: Sample Student Scenarios
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '7. Sample Student Case Scenarios', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'The following five concrete case scenarios illustrate the application of BrightPath Learning policies to real-world learner situations.',
            }),
          ],
        }),

        // Scenario 1
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Scenario 1 — Priya Sharma: Timely Refund Request', true, 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Student & Course', 'Priya Sharma — Web Development Foundations (Fee: ₹7,500, Paid: March 1, 2026, Txn: TXN-WD-88412)', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Academic Activity', 'Completed 0 lessons; submitted 0 graded assignments.', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Request Date', 'March 5, 2026 (Day 4 after payment, within the 7-calendar-day window).', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Evaluation & Outcome', 'APPROVED for full refund of ₹7,500. Priya met all criteria (within 7 days, <= 1 lesson completed, 0 assignments submitted). Funds credited back to her bank account within 6 business days.', 100),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { after: 140 } }),

        // Scenario 2
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Scenario 2 — Rohan Verma: Disqualified Refund Request', true, 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Student & Course', 'Rohan Verma — Data Analytics Essentials (Fee: ₹6,000, Paid: February 10, 2026, Txn: TXN-DA-55201)', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Academic Activity', 'Completed 3 lessons and submitted Assignment 1 on February 14, 2026.', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Request Date', 'February 15, 2026 (Day 5 after payment).', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Evaluation & Outcome', 'DENIED. Although the request arrived on calendar Day 5 (within 7 days), Rohan completed 3 lessons (limit: max 1 lesson) and submitted a graded assignment (limit: 0). The enrollment is strictly non-refundable.', 100),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { after: 140 } }),

        // Scenario 3
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Scenario 3 — Ananya Nair: Successful Certificate Qualification', true, 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Student & Course', 'Ananya Nair — Cloud Fundamentals (4 weeks, Paid: January 15, 2026)', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Academic Activity', 'Completed 9 out of 10 lessons (90% attendance, above 80% threshold). Scored 74% on the final assessment (above 60% threshold).', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Evaluation & Outcome', 'QUALIFIED FOR CERTIFICATE. Ananya fulfilled both academic criteria. Her digital certificate (Credential ID: BP-CF-2026-904) was issued 2 business days after verification on February 20, 2026.', 100),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { after: 140 } }),

        // Scenario 4
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Scenario 4 — Vikram Malhotra: Late Assignment Submission & Penalty', true, 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Student & Course', 'Vikram Malhotra — Web Development Foundations', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Assignment & Timeline', 'Assignment 2 (React State Management) was due April 10, 2026 at 11:59 PM. Vikram submitted on April 12, 2026 at 2:15 PM (2 calendar days late).', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Grading & Outcome', 'Earned raw evaluation score of 85/100. Because submission was within the 3-day grace period, a 10% penalty (-8.5 points) was applied. Final recorded grade: 76.5/100. Graded within 3 business days on April 15, 2026.', 100),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { after: 140 } }),

        // Scenario 5
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Scenario 5 — Neha Kulkarni: Assessment Retake Requirement', true, 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Student & Course', 'Neha Kulkarni — Cloud Fundamentals', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Academic Activity', 'Completed 85% of course lessons (satisfies 80% attendance rule). Scored 54% on the final assessment (below 60% passing mark).', 100),
              ],
            }),
            new TableRow({
              children: [
                scenarioCell('Evaluation & Outcome', 'CERTIFICATE WITHHELD. Neha failed to achieve the minimum 60% assessment score. In accordance with policy, she was scheduled for one free retake 7 calendar days later.', 100),
              ],
            }),
          ],
        }),

        // Section 8: Facts for Retrieval Testing
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: '8. Quick Reference & System Verification Matrix', bold: true, size: 28, color: '0F172A' })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'The following structured reference matrix compiles 24 key facts from across this manual for automated retrieval verification and cross-policy reasoning benchmarks.',
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          rows: [
            new TableRow({
              children: [
                cell('Fact ID', true, 12),
                cell('Domain / Topic', true, 30),
                cell('Canonical Specification / Value', true, 58),
              ],
            }),
            new TableRow({ children: [cell('F-01', false, 12), cell('Founding Year', false, 30), cell('2021', false, 58)] }),
            new TableRow({ children: [cell('F-02', false, 12), cell('Headquarters', false, 30), cell('Bengaluru, Karnataka, India', false, 58)] }),
            new TableRow({ children: [cell('F-03', false, 12), cell('Support Operating Hours', false, 30), cell('Monday–Friday, 9:00 AM–5:00 PM IST', false, 58)] }),
            new TableRow({ children: [cell('F-04', false, 12), cell('Support Response Target', false, 30), cell('1 business day', false, 58)] }),
            new TableRow({ children: [cell('F-05', false, 12), cell('Web Dev Duration & Fee', false, 30), cell('8 weeks duration; fee is ₹7,500', false, 58)] }),
            new TableRow({ children: [cell('F-06', false, 12), cell('Data Analytics Duration & Fee', false, 30), cell('6 weeks duration; fee is ₹6,000', false, 58)] }),
            new TableRow({ children: [cell('F-07', false, 12), cell('Cloud Fundamentals Duration & Fee', false, 30), cell('4 weeks duration; fee is ₹4,000', false, 58)] }),
            new TableRow({ children: [cell('F-08', false, 12), cell('All-Courses Combined Fee', false, 30), cell('₹17,500 (₹7,500 + ₹6,000 + ₹4,000)', false, 58)] }),
            new TableRow({ children: [cell('F-09', false, 12), cell('All-Courses Combined Duration', false, 30), cell('18 weeks sequential study (8 + 6 + 4)', false, 58)] }),
            new TableRow({ children: [cell('F-10', false, 12), cell('Total Graded Course Assignments', false, 30), cell('9 assignments across all 3 courses (4 + 3 + 2)', false, 58)] }),
            new TableRow({ children: [cell('F-11', false, 12), cell('Total Capstone Projects', false, 30), cell('3 capstone projects across the catalog (1 per course)', false, 58)] }),
            new TableRow({ children: [cell('F-12', false, 12), cell('Refund Request Deadline', false, 30), cell('Within 7 calendar days from payment date', false, 58)] }),
            new TableRow({ children: [cell('F-13', false, 12), cell('Refund Lesson Completion Ceiling', false, 30), cell('Maximum 1 lesson completed (2 or more disqualifies)', false, 58)] }),
            new TableRow({ children: [cell('F-14', false, 12), cell('Refund Assignment Ceiling', false, 30), cell('0 graded assignments submitted (1 or more disqualifies)', false, 58)] }),
            new TableRow({ children: [cell('F-15', false, 12), cell('Refund Processing Window', false, 30), cell('5–7 business days after approval', false, 58)] }),
            new TableRow({ children: [cell('F-16', false, 12), cell('Certificate Lesson Threshold', false, 30), cell('Minimum 80% lesson completion required', false, 58)] }),
            new TableRow({ children: [cell('F-17', false, 12), cell('Certificate Assessment Threshold', false, 30), cell('Minimum 60% final assessment score required', false, 58)] }),
            new TableRow({ children: [cell('F-18', false, 12), cell('Certificate Issuance Timeline', false, 30), cell('2 business days following academic verification', false, 58)] }),
            new TableRow({ children: [cell('F-19', false, 12), cell('Assessment Retake Waiting Period', false, 30), cell('7 calendar days between initial attempt and retake', false, 58)] }),
            new TableRow({ children: [cell('F-20', false, 12), cell('Assignment Grading Window', false, 30), cell('3 business days from submission timestamp', false, 58)] }),
            new TableRow({ children: [cell('F-21', false, 12), cell('Late Assignment Deduction', false, 30), cell('10% penalty for up to 3 calendar days late', false, 58)] }),
            new TableRow({ children: [cell('F-22', false, 12), cell('Late Assignment Hard Cutoff', false, 30), cell('Zero score if >3 calendar days late without prior exception', false, 58)] }),
            new TableRow({ children: [cell('F-23', false, 12), cell('Minimum Video Streaming Speed', false, 30), cell('5 Mbps internet bandwidth', false, 58)] }),
            new TableRow({ children: [cell('F-24', false, 12), cell('Credentials Non-Disclosure Rule', false, 30), cell('Staff never ask for passwords or OTPs', false, 58)] }),
          ],
        }),
      ],
    },
  ],
})

async function main() {
  const buffer = await Packer.toBuffer(doc)
  await writeFile(outputPath, buffer)
  console.log('Successfully generated DOCX at:', outputPath)
  console.log('File size:', buffer.length, 'bytes')
}

main().catch(console.error)
