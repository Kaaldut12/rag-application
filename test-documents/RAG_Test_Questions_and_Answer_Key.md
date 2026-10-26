# BrightPath Learning — RAG Evaluation Benchmark
## Test Questions and Ground-Truth Answer Key

This evaluation suite is designed to benchmark Retrieval-Augmented Generation (RAG) applications using the document **BrightPath Learning — RAG Testing Knowledge Base** (`RAG_Test_Knowledge_Base.docx` and `RAG_Test_Knowledge_Base.pdf`).

---

### Test Question Suite (15 Questions)

#### Category A: Simple Factual Questions
*Direct single-chunk retrieval questions to test keyword matching, basic semantic search, and extraction.*

1. **Q1:** In what year was BrightPath Learning founded?
2. **Q2:** What are the official customer support operating hours and time zone?
3. **Q3:** What is the course fee and duration for Web Development Foundations?
4. **Q4:** What minimum internet connection speed is recommended for smooth video playback on the learning portal?
5. **Q5:** What is the normal instructor review and grading turnaround time for submitted assignments?

---

#### Category B: Questions Requiring Multiple Facts / Multi-Hop Retrieval
*Cross-chunk and cross-policy reasoning questions requiring the retrieval and synthesis of information from different sections or table rows.*

6. **Q6:** If a student enrolls in all three courses offered by BrightPath Learning, what is the total combined cost in Indian Rupees (₹) and the total number of weeks required to complete them sequentially?
7. **Q7:** How many total graded assignments and capstone projects must a student complete across all three courses in the catalog combined?
8. **Q8:** What are the two simultaneous academic criteria a student must meet to receive a digital course completion certificate, and how long does certificate issuance take following verification?
9. **Q9:** What four specific pieces of information must a student include when submitting a refund request?
10. **Q10:** Under what specific conditions is an enrollment strictly non-refundable even if the student submits their refund request within the 7-calendar-day window?

---

#### Category C: Scenario-Based Policy Questions
*Complex scenario evaluations testing the RAG system's ability to apply rules and constraints to concrete student cases.*

11. **Q11:** Priya Sharma paid ₹7,500 for Web Development Foundations on March 1, 2026. She completed zero lessons and submitted no assignments, then requested a refund on March 5, 2026. Was her refund approved or denied, and what were the terms?
12. **Q12:** Rohan Verma enrolled in Data Analytics Essentials on February 10, 2026. By February 14, he had completed 3 lessons and submitted Assignment 1. He submitted a refund request on February 15, 2026. Why was his refund denied?
13. **Q13:** Vikram Malhotra submitted Assignment 2 two calendar days late and achieved a raw evaluation score of 85/100. What was his final recorded grade, and what policy determined this outcome?

---

#### Category D: Negative / Out-of-Scope Questions (Hallucination & Grounding Tests)
*Questions whose answers are deliberately absent from the knowledge base. A well-grounded RAG application must state that the context lacks the answer rather than fabricating one.*

14. **Q14:** Does BrightPath Learning offer an installment or EMI payment plan for students who cannot pay course fees upfront?
15. **Q15:** Who is the founder and CEO of BrightPath Learning, and what is their personal phone number?

---

### Authoritative Ground-Truth Answer Key

| Question ID | Category | Canonical Ground-Truth Answer | Document Reference | Key Evaluation Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **Q1** | Simple Factual | BrightPath Learning was founded in **2021**. | Section 1 (Company Information) & Section 8 (Fact F-01) | Must state 2021. |
| **Q2** | Simple Factual | **Monday–Friday, 9:00 AM–5:00 PM IST** (Indian Standard Time). Operations are paused on weekends and Indian national holidays. | Section 1 (Company Information) & Section 8 (Fact F-03) | Must mention Monday–Friday, 9:00 AM–5:00 PM, and IST. |
| **Q3** | Simple Factual | **8 weeks** duration at a fee of **₹7,500** (INR). | Section 2 (Course Catalog) & Section 8 (Fact F-05) | Must state 8 weeks and ₹7,500. |
| **Q4** | Simple Factual | A minimum download speed of **5 Mbps**. | Section 6 (Technical Support) & Section 8 (Fact F-23) | Must state 5 Mbps. |
| **Q5** | Simple Factual | **3 business days** from submission timestamp. | Section 5 (Assignment Policy) & Section 8 (Fact F-20) | Must specify 3 business days. |
| **Q6** | Multi-Hop | Combined fee is **₹17,500** (₹7,500 for Web Development + ₹6,000 for Data Analytics + ₹4,000 for Cloud Fundamentals). Combined sequential duration is **18 weeks** (8 + 6 + 4 weeks). | Section 2 (Course Catalog) & Section 8 (Facts F-08 & F-09) | Must show correct sum of fees (₹17,500) and sum of durations (18 weeks). |
| **Q7** | Multi-Hop | **9 graded assignments** (4 in Web Dev + 3 in Data Analytics + 2 in Cloud) and **3 capstone projects** (1 per course). | Section 2 (Curriculum & Projects) & Section 8 (Facts F-10 & F-11) | Must state 9 assignments and 3 capstones. |
| **Q8** | Multi-Hop | Must complete at least **80% of lessons** AND score at least **60% on the final assessment**. Digital certificates are issued within **2 business days** after verification. | Section 4 (Certificate Policy) & Section 8 (Facts F-16, F-17, F-18) | Must include both 80% attendance, 60% score, and 2-business-day turnaround. |
| **Q9** | Multi-Hop | (1) Registered student email address, (2) Exact course name, (3) Payment date, and (4) Payment transaction reference ID (e.g., TXN-WD-88412). | Section 3 (Refund Policy, item 5) | Must list all 4 required fields. |
| **Q10** | Multi-Hop | Non-refundable if the student has completed **two or more lessons** (limit is max 1), OR if the student has submitted **even one graded assignment** (limit is 0). | Section 3 (Refund Policy, item 3) & Section 8 (Facts F-13 & F-14) | Must state the lesson limit (>1) and assignment limit (any submission). |
| **Q11** | Scenario | **APPROVED** for a full refund of ₹7,500. Priya requested on Day 4 (within the 7-calendar-day window), completed 0 lessons (≤ 1 lesson allowed), and submitted 0 assignments. Refund was processed back to her original payment method in 6 business days. | Section 7 (Scenario 1 — Priya Sharma) & Section 3 | Must indicate approval, explain the 3 satisfied criteria, and state ₹7,500 refunded. |
| **Q12** | Scenario | **DENIED**. Although the request was made on Day 5 (within 7 calendar days), Rohan completed 3 lessons (violating the 1-lesson maximum) and submitted 1 graded assignment (violating the zero-submission rule). | Section 7 (Scenario 2 — Rohan Verma) & Section 3 | Must indicate denial and explicitly cite the two violated thresholds. |
| **Q13** | Scenario | Final recorded grade: **76.5/100**. Under the late submission policy, assignments submitted up to 3 calendar days late receive a flat 10% penalty (10% of 85 = 8.5 points deduction; 85 - 8.5 = 76.5). | Section 7 (Scenario 4 — Vikram Malhotra) & Section 5 | Must calculate 76.5/100 and state the 10% late penalty rule. |
| **Q14** | Negative / Out-of-Scope | The knowledge base **does not contain any information** regarding installment, EMI, or deferred payment options. | Document context (Entire handbook) | **PASS:** RAG states the document does not mention EMI/installments.<br>**FAIL:** RAG fabricates monthly plans or bank partnerships. |
| **Q15** | Negative / Out-of-Scope | The document **does not state** the name of the founder, CEO, or any telephone contact number; only the official email address (`support@brightpathlearning.in`) is provided. | Document context (Entire handbook) | **PASS:** RAG states the founder/CEO and phone number are not provided in the text.<br>**FAIL:** RAG invents a name or phone number. |
