import VideoPlayer from '../components/VideoPlayer'

function FeaturePage({ feature }) {
  const featureContent = {
    recruitment: {
      title: 'Recruitment',
      intro: 'With a growing company, comes a rapidly growing roster of employees. From planning your hiring strategy and scheduling interviews to identifying the best candidates and making job offers, Frappe HR has got you covered throughout your recruitment cycle.',
      steps: [
        'Anticipate your hiring needs',
        'Create staffing plans',
        'List job openings',
        'Manage job applicants',
        'Schedule interviews',
        'Capture & analyse feedback for decision making',
        'Send job offers',
        'Recruitment Analytics',
      ],
      sections: [
        {
          title: 'Anticipate your hiring needs',
          content: "Make your recruitment process inclusive to avoid over-hiring. Allow hiring managers and department heads to raise Job Requisitions, clearly communicating their needs. Encourage employees to refer suitable candidates from their network to build a strong team.",
          image: '/anticipate-hiring-needs.webp',
        },
        {
          title: 'Create staffing plans',
          content: "Create staffing plans at a company or department level by sourcing job requisitions. Define roles, the number of vacancies, and estimated costs while having the current headcount information handy to ensure you don't go over budget.",
          image: '/staffing-plans.webp',
        },
        {
          title: 'List job openings',
          content: "Publish new jobs with free-flowing descriptions for applicants to browse and apply. You can also opt for more transparency by publishing salary ranges and the number of applications received. Create a custom Job Application form to ensure you have all the required information captured for shortlisting candidates.",
          video: "/job-listing-4k.mp4",
        },
        {
          title: 'Manage job applicants',
          content: "Maintain a comprehensive list of applicants and never lose track of potential candidates with our advanced filtering options, auto assignments, and custom reports. Track your applicant's journey throughout the interview process, and maintain a clean thread of communications.",
          image: '/manage-job-applicants.webp',
        },
        {
          title: 'Schedule interviews',
          content: "Schedule or reschedule interviews based on the recruiter's availability. Ensure that candidates and recruiters are informed at all stages through automated email reminders to avoid no-shows.",
          image: '/schedule-interviews.webp',
        },
        {
          title: 'Capture & analyze feedback for decision-making',
          content: "Efficiently capture feedback from multiple interviewers across multiple rounds. Frappe HR generates an overview of the average ratings, demonstrated skills, and a detailed feedback timeline, enabling you to make informed decisions.",
          video: "/interview-4k.mp4",
        },
        {
          title: 'Send job offers',
          content: "You have found the perfect candidates! All that's left is to help you complete the final hiring steps by sending out offers to viable applicants. Frappe HR's customizable offer templates and electronic signatures speed up this process, ensuring a smooth transition from candidate to employee.",
          video: "/send-job-offers.mp4",
        },
        {
          title: 'Recruitment Analytics',
          content: "Get a bird's eye view of your entire process. Get important insights and metrics right from requisition to recruitment.",
          image: '/recruitment-dashboard.webp',
        },
      ],
      nextFeature: 'Employee Lifecycle',
      nextFeatureUrl: '/features/employee-lifecycle',
    },
    'employee-lifecycle': {
      title: 'Employee Lifecycle',
      intro: "We understand that as an HR rep, your goal is to make life easier for your employees throughout their entire lifecycle. Right from onboarding to exits, transfers to promotions, we have got your back every step of the way.",
      steps: [
        'Maintain a comprehensive employee repository',
        'Visualize your org structure',
        'Onboard employees',
        'Manage promotions & transfers',
        'Automate employee reminders',
        'Acknowledge grievances',
        'Settle full and final statements',
        'Document employee feedback with exit interviews',
      ],
      sections: [
        {
          title: 'Maintain a comprehensive employee repository',
          content: "As your business grows, organize your company based on branches, departments, designations, and more with a highly scalable employee database. Quickly access any document linked to an employee right from the employee dashboard.",
          video: "/employee-repository.mp4",
        },
        {
          title: 'Visualize your org structure',
          content: "The organizational chart in Frappe HR visually represents who a person is reporting to and their position in the organization hierarchy. Providing employees access to the organization chart can help them reach out to the right people, and improve communication and collaboration across teams and hierarchies.",
          image: '/org-chart.webp',
        },
        {
          title: 'Onboard employees',
          content: "Onboarding an employee involves coordinating with different departments and reporting managers. Standardize onboarding procedures by creating department or designation-wise templates, outlining task assignments with due dates - be it access-related activities, issuing assets, allocating leaves, or document uploads.",
          image: '/onboard-employees.webp',
        },
        {
          title: 'Manage promotions & transfers',
          content: "Reward your top employees with promotions and manage company/department-wise transfers seamlessly. Frappe HR maintains an internal work history to record your employee's journey within the organization.",
          image: '/manage-promotions.webp',
        },
        {
          title: 'Automate employee reminders',
          content: "Don't miss out on important events for your teammates with birthday and work anniversary reminders. You can also enable advance holiday reminders to help you plan the next holiday you want to go on!",
          image: '/reminders.webp',
        },
        {
          title: 'Acknowledge grievances',
          content: "Ensure your employees feel heard by managing grievance reporting and resolution effectively. Provide a platform to employees for expressing concerns, whether it's with a teammate, department, or the company.",
          image: '/grievances.webp',
        },
        {
          title: 'Settle full and final statements',
          content: "Frappe HR simplifies separation tasks with full and final settlements. Settle payables, receivables, and assets allocated to the employee, and record the accounting impact. You can also choose to recover asset costs instead of returning them, letting the employees own the assets.",
          image: '/fullandfinal.webp',
        },
        {
          title: 'Document employee feedback with exit interviews',
          content: "Saying goodbye is tough but you can ensure employees leave on a positive note. Document your exit interviews and gather feedback using customized exit questionnaires to identify areas of improvement for the company.",
          image: '/employee-exits.webp',
        },
      ],
      previousFeature: 'Recruitment',
      previousFeatureUrl: '/features/recruitment',
      nextFeature: 'Shifts & Attendance',
      nextFeatureUrl: '/features/shifts-attendance',
    },
    'shifts-attendance': {
      title: 'Shifts & Attendance',
      intro: "Managing attendance for a geographically scattered team can be a nightmare. Bid adieu to tedious spreadsheets and shift registers. Frappe HR offers a variety of options to ensure that attendance records are always up-to-date. Our mobile app enables your team to clock in and out from anywhere with geolocation capturing. You can also manage shifts and rosters effortlessly and integrate your biometric device for auto attendance. Need more control? The bulk attendance & shift tools help you efficiently manage attendance at scale.",
      steps: [
        'Configure shifts',
        'Apply & approve shift requests',
        'Manage rosters',
        'Check-in and check-out with geolocation capturing',
        'Integrate biometric devices',
        'Auto attendance in sync with your payroll',
        'Regularize attendance with attendance requests',
        'Use bulk attendance tools for more control',
        'Analyse with attendance reports',
      ],
      sections: [
        {
          title: 'Configure shifts',
          content: "Easily configure multiple shifts with auto attendance settings. Control working hours threshold, calculation methods, and grace period settings.",
          image: '/configure-shifts.webp',
        },
        {
          title: 'Apply & approve shift requests',
          content: "Let employees pick shifts that work best for them. Shift calendar makes it easier to visualize their team's schedules. You can also set up multi-level approval workflows to finalize the assignments.",
          image: '/shift-request.webp',
        },
        {
          title: 'Manage rosters',
          content: "Visualize your employee list, holidays, and existing shift assignments and requests with the shift planning view. Drag & drop shifts to alter or swap schedules with other employees. You can also create repeating shift schedules ahead of time.",
          image: '/roster.webp',
        },
        {
          title: 'Check-in and check-out with geolocation capturing',
          content: "Make check-ins and check-outs a breeze with the Frappe HR mobile app's easy interface. You can also enable geolocation tracking for a detailed work location history.",
          video: '/geolocation-checkin.mp4',
        },
        {
          title: 'Integrate biometric devices',
          content: "Improve accuracy and eliminate manual errors by seamlessly integrating biometric devices from multiple locations for syncing logs.",
          image: '/employee-checkin.webp',
        },
        {
          title: 'Auto-attendance in sync with your payroll',
          content: "Frappe HR marks auto attendance based on your check-ins and shift settings. It also calculates working hours, and flags late entries & early exits based on your configuration. If you are using separate systems for attendance & payroll, Frappe HR can make your life easier. The attendance system is closely integrated with payroll to ensure accurate and timely payments.",
          image: '/auto-attendance.webp',
        },
        {
          title: 'Regularize attendance with attendance requests',
          content: "Missed a swipe? No sweat. Employees can easily submit attendance requests to rectify the attendance marked by the system.",
          image: '/attendance-request.webp',
        },
        {
          title: 'Use bulk attendance tools for more control',
          content: "If you prefer marking attendance manually, use Frappe HR's bulk tools. The employee attendance tool helps you mark attendance for all employees with drill-down filters while keeping the marked attendance data handy. You can also upload attendance from your spreadsheets using Upload Attendance or Data Import tools.",
        },
        {
          title: 'Analyse with attendance reports',
          content: "Missed an entry? Don't worry. You can refer back to the monthly attendance sheet with drill-down filters to see day-wise attendance status per shift. Easily visualize leaves and holidays or view a summary of total present/absent days, late entries, early exits, and leaves taken for each type. View checkin & attendance summary with the shift attendance report.",
          image: '/attendance-sheet.webp',
        },
      ],
      previousFeature: 'Employee Lifecycle',
      previousFeatureUrl: '/features/employee-lifecycle',
      nextFeature: 'Leave Management',
      nextFeatureUrl: '/features/leave-management',
    },
    'leave-management': {
      title: 'Leave Management',
      intro: "Frappe HR makes allocating, applying, tracking & managing leaves a breeze. Configure even the most complex leave policies & rules with ease. Carry-forwarding, expiry, leave without pay, earned leaves - it's all covered. Manage bulk leave policy assignments. Visualize and plan work efficiently with the leave calendar. View leave balances, apply & approve leaves - all from your phone. Keep your team informed with configurable workflows and notifications.",
      steps: [
        'Configurable leave policies',
        'Bulk allocations from the leave control panel',
        'Apply and approve leaves',
        'Plan better with the leave calendar',
        'Block leave requests during peak periods',
        'Encash leave balances',
        'Configure earned leaves',
        'Effortless holiday planning',
        'Pull regional holidays with a click',
        'Track balances with leave reports',
      ],
      sections: [
        {
          title: 'Configurable leave policies',
          content: "Tailor your leave policies to fit your organizational needs perfectly. Be it carry-forwarding, expiry, compensatory off, leave without pay, partially paid leave, earned leave, encashments, or consecutive leave allowance — Frappe HR offers a rich set of rules to configure your leave types. Define annual allocation for each leave type with leave policies.",
          image: '/leave-type.webp',
        },
        {
          title: 'Bulk allocations from the leave control panel',
          content: "We understand that a single policy cannot be applied to teams with a diverse set of roles and responsibilities. With the leave control panel, filter & drill down to specific employee groups, then assign policies in bulk for consistent and fair leave management.",
          video: "/leave-control-panel.mp4",
        },
        {
          title: 'Apply and approve leaves',
          content: "See an instant leave balance summary while applying for leaves from the desk or your phone. Set up multi-level approval workflows and configure notifications to keep your team informed at all times.",
          image: '/leave-application.webp',
        },
        {
          title: 'Plan better with the leave calendar',
          content: "Our leave calendar gives you a complete overview of employee availability. See who's on leave and when, helping you avoid scheduling conflicts and manage workloads efficiently. Employees can apply for days off directly through the calendar, keeping everyone on the same page.",
          image: '/leave-calendar.webp',
        },
        {
          title: 'Block leave requests during peak periods',
          content: "Peak seasons, project launches, or critical events require your team to be optimally staffed. Leave block lists enable you to configure leave block dates with reasons applicable to the entire company or specific departments. It also allows you to define a list of approvers who can approve leave applications on these specific dates, in case of urgency.",
          image: '/leave-block.webp',
        },
        {
          title: 'Encash leave balances',
          content: "Configure salary component & encashment amount per day as per your policies. You can also set up maximum encashable leaves to ensure responsible use. Our payroll engine handles the calculations to ensure fair compensation for unused leave.",
          image: '/leave-encashment.webp',
        },
        {
          title: 'Configure earned leaves',
          content: "Frappe HR allows you to configure earned leaves - i.e. leaves that are \"earned\" by employees after working in the company for a certain period. Based on your settings, earned leaves are allocated to the employee on a pro-rata basis for the defined duration. You can also configure rounding of allocated leaves for fractional allotments and choose the accrual day of the month - first day, last day, or day of joining for the employee.",
          image: '/earned-leave.webp',
        },
        {
          title: 'Effortless holiday planning',
          content: "Holiday lists have a crucial role to play in attendance, leaves, and payroll calculations. Plan for the year ahead by setting up and sharing a calendar of weekly off, fixed, and optional holidays. Employees can view this list anytime, making project planning and managing deadlines a cinch.",
          image: '/holiday-list.webp',
        },
        {
          title: 'Pull regional holidays with a click',
          content: "You don't need to manually add every local holiday to the list. Just select your country and subdivision and Frappe HR will pull that region's local holidays into the list.",
          video: "/holiday-list-video.mp4",
        },
        {
          title: 'Track balances with leave reports',
          content: "Get the complete picture with detailed leave balance reports. Use filters for a deep dive into opening balances, carry-forwarded leaves, new allocations, used and expired leaves, and closing balances for every employee. You can also view the leave ledger report to see the complete history of how your leaves were used, allocated, and expired. Use this data to plan and refine leave policies for the upcoming year, ensuring a balanced system that benefits both your team and your business.",
          image: '/leave-ledger.webp',
        },
      ],
      previousFeature: 'Shifts & Attendance',
      previousFeatureUrl: '/features/shifts-attendance',
      nextFeature: 'Expense Management',
      nextFeatureUrl: '/features/expense-management',
    },
    'expense-management': {
      title: 'Expense Management',
      intro: "Managing expenses can be a daunting task for organizations, often bogged down by endless paperwork, manual data entry, and tedious approval processes. Streamline travel and expense management. Payout advances, track claims, and draw meaningful insights with the seamless accounting integration.",
      steps: [
        'Claim expenses',
        'Configure multi-level approval workflows',
        'Manage employee advances',
        'Settle advances against expenses',
        'Seamless accounting integration',
        'Claim analytics',
      ],
      sections: [
        {
          title: 'Claim expenses',
          content: "Enable employees to claim expenses they make out of their pocket on behalf of the company. Snap and upload receipts supporting the claims. You can also partially sanction each claim item and update taxes on your expenses separately in the taxes & charges section. Reimburse business expenses, company perks, and mediclaim allowances, or configure expense types to fit your company's policies. Do all of this on the go with the Frappe HR mobile app.",
          image: '/claim-expense.webp',
        },
        {
          title: 'Configure multi-level approval workflows',
          content: "You can set up cross-departmental multi-level workflows with conditions to ensure your claims are fairly reviewed by the right people. Workflows can be easily built for any form with the powerful drag-and-drop workflow builder.",
          image: '/expense-approval.webp',
        },
        {
          title: 'Manage employee advances',
          content: "With Frappe HR, employees can easily request advances to cover upcoming business expenses or request salary advances. You have the flexibility to pay out these advances through payroll or separate payment entries and even manage the return of unclaimed advance amounts. Plus, the intuitive status tracking provides clear visibility into the claim & payment status of all advances.",
          image: '/employee-advances.webp',
        },
        {
          title: 'Settle advances against expenses',
          content: "When employees incur expenses on behalf of their company, they either spend it from their own pocket or use prepaid advances and claim later. Frappe HR takes care of auto-allocating unclaimed amounts from multiple advances against your expenses to eliminate the need for separate reconciliation.",
          image: '/settle-advances.webp',
        },
        {
          title: 'Seamless accounting integration',
          content: "With Frappe HR, every HR & payroll transaction is meticulously recorded with its corresponding accounting impact. Easily assign accounting dimensions such as projects, cost centers, and departments to your claim items. This ensures costs are accurately tracked against the right entities for cleaner reporting. You can also manage partial payments against claims and advances and track employee payables and receivables for a complete financial picture.",
          image: '/accounting-integration.webp',
        },
        {
          title: 'Claim Analytics',
          content: "Stay up-to-date on financials with reports like unpaid claims, advance summaries, and accounting ledgers.",
          image: '/claim-analytics.webp',
        },
      ],
      previousFeature: 'Leave Management',
      previousFeatureUrl: '/features/leave-management',
      nextFeature: 'Performance Management',
      nextFeatureUrl: '/features/performance-management',
    },
    'performance-management': {
      title: 'Performance Management',
      intro: "Effective performance management is key to unlocking your team's full potential and achieving organizational goals. Frappe HR offers a comprehensive system that empowers you to define department-wise Key Result Areas (KRAs) and individual goals, track progress, and provide continuous employee feedback. Embrace a more organized, growth-focused approach with features like appraisal templates, automated goal score computation, formula-based final scores, and more.",
      steps: [
        'Create appraisal templates',
        'Manage appraisal cycles',
        'Track goals',
        'Align goals with key result areas (KRAs)',
        'Capture timely performance feedback',
        'Enable employees to evaluate themselves',
        'Configure formulas for calculating the final score',
        'Gain insights with the appraisal overview report',
      ],
      sections: [
        {
          title: 'Create appraisal templates',
          content: "Ensure a consistent evaluation process throughout your organization with standardized appraisal templates. Define key result areas and feedback criteria that align with your company's performance standards and expectations. You can define company-wide or designation-wise appraisal templates.",
          image: '/appraisal-templates.webp',
        },
        {
          title: 'Manage appraisal cycles',
          content: "We understand that different departments might require different evaluation cycles. Engineering teams may benefit from annual reviews, while sales might thrive with quarterly feedback loops. Frappe HR allows you to group employees based on assessment periods, departments, designations, and more with appraisal cycles. Track progress at every stage of the appraisal process and configure automated reminders and notifications to keep everyone informed.",
          image: '/appraisal-cycle.webp',
        },
        {
          title: 'Track goals',
          content: "Define clear, measurable, role-oriented goals and sub-goals from the tree view. Archive goals that no longer serve the purpose. Update progress and track timelines to prioritize efficiently",
          image: '/track-goals.webp',
        },
        {
          title: 'Align goals with key result areas (KRAs)',
          content: "Connect specific goals with key result areas (KRAs) relevant to your role. This ensures goals are directly tied to your overall performance evaluation. Get automatic goal scores calculated based on the weightage assigned to your KRAs. Understand where you are excelling and which result areas need course correction.",
          image: '/kras.webp',
        },
        {
          title: 'Capture timely performance feedback',
          content: "Offer timely and constructive feedback to your employees with Frappe HR. Use 360° feedback to gather input from peers, managers, and subordinates, ensuring a well-rounded evaluation. Get a complete perspective on every employee's performance with the feedback timeline view and average ratings. You can also submit new feedback right from this view.",
          image: '/feedback.webp',
        },
        {
          title: 'Enable employees to evaluate themselves',
          content: "Under the self appraisal tab, employees can rate themselves and add reflections on their performance. A total self-score is calculated based on the rating and the weightage against each feedback criterion, offering valuable insights into an employee's self-perception.",
          image: '/self-appraisal.webp',
        },
        {
          title: 'Configure formulas for calculating the final score',
          content: "Configure the final score calculation for each appraisal group to accurately reflect that team's priorities. For instance, an engineering team might give more weightage to goal-based KRAs, while the training team's performance should be assessed based on external feedback. Fine-tune weights for goal scores, self-scores, and feedback scores. Leverage employee data such as branch, department, designation, etc. to further refine the weightage system.",
          image: '/formulas.webp',
        },
        {
          title: 'Gain insights with the appraisal overview report',
          content: "Get a comprehensive overview of your entire appraisal cycle with the appraisal reports.",
          image: '/appraisal-report.webp',
        },
      ],
      previousFeature: 'Expense Management',
      previousFeatureUrl: '/features/expense-management',
      nextFeature: 'Payroll',
      nextFeatureUrl: '/features/payroll',
    },
    payroll: {
      title: 'Payroll',
      intro: "Seeing a 'salary credited' message often brings a smile to your face, but there's a lot of work that goes into that. Diverse pay structures, complex regional tax regulations, and accurate generation of payslips for a large team can feel overwhelming. We're making all of this easier with a feature-packed payroll module. Cut ties with disparate payroll and accounting systems to save hours of reconciliation work every month on payroll and expense data. Frappe HR promises integrated accounting with your payroll.",
      steps: [
        'Create salary structures',
        'Assign salary structures in bulk',
        'Preview salary slips to avoid misconfigurations',
        'Run standard payroll',
        'Accommodate additional salaries & off-cycle payments',
        'Book expenses against payroll cost centers',
        'Handle multi-currency payroll',
        'Manage employee loans',
        'Timesheet-based payroll for the services sector',
      ],
      sections: [
        {
          title: 'Create salary structures',
          content: "Frappe HR empowers you to build rule-based, complex salary structures easily. Define earning and deduction components with conditions and formulas. Map any payroll use case - from statutory & tax deductions to bonuses and allowances. Ensure accurate calculations for components based on actual working days, rounding preferences, and amount inclusions in salary totals. If you update component formulas anytime, simply synchronize changes with existing salary structures.",
          image: '/salary-structure.webp',
        },
        {
          title: 'Assign salary structures in bulk',
          content: "Drill down to specific employee groups with advanced filters, update base & variable amounts for multiple rows, and assign salary structures in bulk with the Salary Structure Assignment Tool.",
          video: "/bulk-salary-assignment.mp4",
        },
        {
          title: 'Preview salary slips to avoid misconfigurations',
          content: "Want to ensure your salary structure configurations are correct? Frappe HR lets you preview salary slips to see the configurations taking effect. Make amends wherever needed before running the actual payroll.",
          image: '/preview-slips.webp',
        },
        {
          title: 'Run standard payroll',
          content: "Run monthly, fortnightly, or weekly payroll cycles for the entire company, or a specific branch or department, in minutes. With the payroll filters, pay every kind of employee in a single payroll system - be it your part-time employees or interns. Book expenses, post employee-wise accruals and bank entries, and ensure your general ledger stays perfectly synchronized with your payroll data. Optionally send out password-protected salary slips within just a few clicks.",
          video: "/payroll-entry.mp4",
        },
        {
          title: 'Accommodate additional salaries & off-cycle payments',
          content: "Manage ad hoc salary components without revising your salary structure every time. The additional salary feature in Frappe HR helps you easily set up one-time or recurring payments or deductions. These could be performance bonuses, deputation allowances, pay cuts, arrears, incentives, or any other type of adjustment. You can also specify whether tax needs to be deducted for this specific component during payroll. Need to process reimbursements or salary advances outside the regular cycle? Easily handle off-cycle payments by creating journal entries.",
          image: '/off-cycle.webp',
        },
        {
          title: 'Book expenses against payroll cost centers',
          content: "Payroll is a crucial part of your organizational expenses, and you may benefit from tracking these expenses on a granular level. Frappe HR allows you to book salary expenses against multiple cost centers based on employee or department. As your employees grow in their careers, they might contribute actively to more than 1 business unit. In that case, the salary expenses associated with that employee can be distributed against multiple cost centers by configuring this breakup in salary structure assignments.",
          image: '/cost-center.webp',
        },
        {
          title: 'Handle multi-currency payroll',
          content: "Frappe HR enables you to manage payroll for a global team. Create salary structures and assignments in a different currency and get gross and net totals in the selected currency as well as company currency with exchange rates. Keep your ledgers in sync with multi-currency accounting.",
          image: '/multi-currency.webp',
        },
        {
          title: 'Manage employee loans',
          content: "Frappe HR's integration with Frappe Lending allows you to efficiently manage employee loans right from disbursement to recovery, and synchronize loan repayments with your payroll.",
          image: '/loans.webp',
        },
        {
          title: 'Timesheet-based payroll for the services sector',
          content: "Employees who need to track their hours can easily fill out timesheets with a breakdown of activities for each project or task. Create salary structures based on timesheets, define hourly rates, and manage payouts for the timesheet hours. You can run separate payroll entries for timesheet-based salaries.",
          image: '/timesheet.webp',
        },
      ],
      previousFeature: 'Performance Management',
      previousFeatureUrl: '/features/performance-management',
      nextFeature: 'Payroll Tax & Reports',
      nextFeatureUrl: '/features/payroll-tax',
    },
    'payroll-tax': {
      title: 'Payroll Tax & Reports',
      intro: "Frappe HR's flexibility enables you to map tax configurations for any region. Define income tax slabs, manage tax exemptions, and proof submissions. Stay informed throughout your payroll period with tax breakups on salary slips and the income tax computation report.",
      steps: [
        'Configure income tax slabs',
        'Submit tax declarations & exemption proofs',
        'View income tax breakup on salary slips',
        'Income tax computation report',
        'Review your payroll cycle with the salary register report',
        'Compliance & accounting reports',
      ],
      sections: [
        {
          title: 'Configure income tax slabs',
          content: "Frappe HR lets you configure multiple income tax slabs with rates and conditions. Link the employee's preferred tax regime in their salary structure assignment. Easily factor in additional taxes like Health and Educational Cess on top of the income tax calculations. You can also define the minimum and maximum taxable amount for which this tax would be applicable.",
          image: '/tax-slab.webp',
        },
        {
          title: 'Submit tax declarations & exemption proofs',
          content: "Help your employees understand the benefits they can avail of by documenting tax exemption categories. At the start of the payroll period, employees can fill up their tax exemption declarations, which are automatically factored into payroll calculations for accurate deductions. Towards the end of your payroll cycle, employees can upload exemption proofs to support their declarations. You also have the option to deduct tax for unsubmitted proofs, ensuring complete compliance.",
          image: '/tax-declaration.webp',
        },
        {
          title: 'View income tax breakup on salary slips',
          content: "Have you ever struggled with understanding how the tax amount was derived on your Salary Slip? A salary slip generated in Frappe HR gives you a complete overview of your tax calculations - CTC, exemptions, declarations, non-taxable earnings, annual taxable amount, income tax deducted to date, and future deductions.",
          image: '/tax-breakup.webp',
        },
        {
          title: 'Income tax computation report',
          content: "Visualize how your tax computation is taking effect with exemptions, annual taxable income, applicable tax, tax deducted to date, and future deductions.",
          video: "/income-tax-computation.mp4",
        },
        {
          title: 'Review payroll cycle with the salary register report',
          content: "Before finalizing your payroll, ensure accuracy with Frappe HR's salary register report. This report provides a meticulous overview of all the salary slips. It's packed with key details for every employee payslip - payment days, earnings, deduction, and statutory component amounts, loan repayments, gross pay, and total deductions accounting for the actual net pay. Identify any errors or discrepancies before submission, ensuring a smooth and accurate process. You can also refer back to this report for historical salary data.",
          video: "/salary-register.mp4",
        },
        {
          title: 'Compliance & accounting reports',
          content: "Keep your compliance in check with payroll reports for statutory components like provident fund, professional tax, and income tax deductions. Track employee transactions with reports like the general ledger, accounts payable, and receivables. You can track payroll-related bank transactions between the company and the employees with the help of the bank remittance report.",
          image: '/compliance-reports.webp',
        },
      ],
      previousFeature: 'Payroll',
      previousFeatureUrl: '/features/payroll',
      nextFeature: 'Mobile App',
      nextFeatureUrl: '/features/mobile-app',
    },
    'mobile-app': {
      title: 'Mobile App',
      intro: "The Frappe HR Mobile App brings everyday tasks to your fingertips — employee check-ins, leaves, claims, advances, and salary slips. The goal of this app is not just to ease operations for your employees but also to improve efficiency for your HR Managers. Track all the requests that need your attention on the go based on the employee's approver/workflows.",
      steps: [
        'Check-in and check-out with geolocation capturing',
        'Request Panel',
        'Leaves & Holidays',
        'Expenses & Advances',
        'Salary',
        'Notifications',
        'Employee Profile',
        'Installation & Demo',
      ],
      sections: [
        {
          title: 'Check-in and check-out with geolocation capturing',
          content: "Make check-ins and check-outs a breeze with the Frappe HR mobile app's easy interface. You can also enable geolocation tracking for a detailed work location history.\n\nDashboard\n\nThe bottom tab menu helps you quickly navigate between individual dashboards.\n\nCheckin Panel: Keep track of your last checkin/checkout timestamp and checkin from the panel with just a few clicks. We will soon introduce geo-tagging and geo-fencing for employee checkins.\n\nQuick Links: Shortcuts to create/access commonly-used documents.\n\nRequest Panel: The goal of this app is not just to ease your employee ops but also improve efficiency for your HR Managers. Track all the requests that need your attention on the go based on the employee's approver/workflows.",
          video: "/mobile-checkin.mp4",
        },
        {
          title: 'Request Panel',
          content: "With the request panel, track all the requests that need your attention on the go based on the employee's approver or workflow",
          image: '/request-panel.webp',
        },
        {
          title: 'Leaves & Holidays',
          content: "View leave balances for all your allocated leaves at a glance. Keep your recent leave applications handy for quick edits and approval tracking.\n\nCheckout the Upcoming Holidays to plan your next vacation. This also shows you the day of the week so that you can keep an eye on the long weekends 🤫",
          image: '/leaves-and-holidays.webp',
        },
        {
          title: 'Expenses & Advances',
          content: "Get a comprehensive summary of your total expenses. Apply and approve expenses.\n\nWhen employees incur expenses on behalf of their company, they either spend it from their own pocket or use prepaid advances and claim later. You can check your employee advance balances just like wallet balances here.",
          image: '/expenses-and-advances.webp',
        },
        {
          title: 'Salary',
          content: "In the Salary dashboard you can see a list of salary slips and your year-to-date payouts filtered by payroll period. Check and download salary slips for offline access",
          image: '/salary.webp',
        },
        {
          title: 'Notifications',
          content: "Notifications keep the approvers up-to-date with the documents that need their attention and employees are notified whenever their requests get reviewed. Clicking on a particular item takes you to the target document.\n\nSites hosted on Frappe Cloud can also enable push notifications for instant alerts.",
          image: '/notifications.webp',
        },
        {
          title: 'Employee Profile',
          content: "Access all your employee, company, contact information and settings from the employee profile",
          image: '/employee-profile.webp',
        },
        {
          title: 'Installation & Demo',
          content: "Like what you see? 👀 Sign up and install the app today! You can find the installation steps here. Read this blog or watch this demo for more insights.",
        },
      ],
      previousFeature: 'Payroll Tax & Reports',
      previousFeatureUrl: '/features/payroll-tax',
    },
  }

  const content = featureContent[feature] || featureContent.recruitment

  return (
    <div className="py-12 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold text-[#9e9e9e] uppercase tracking-[0.99px] leading-[1.15] mb-4">
            Features
          </p>
          <h1 
            className="text-3xl mb-8"
            style={{
              fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
              fontWeight: '500',
              lineHeight: '1.2',
              color: '#171717',
            }}
          >
            {content.title}
          </h1>
          <p 
            className="text-sm text-black leading-relaxed mb-10 max-w-lg mx-auto text-justify"
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {content.intro}
          </p>

          {/* Separator Line */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="border-t border-gray-200"></div>
          </div>

          {/* Steps List */}
          {content.steps && (
            <ol 
              className="text-left space-y-1 mb-16 max-w-lg mx-auto"
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {content.steps.map((step, index) => (
                <li key={index} className="text-sm text-black">
                  <span className="font-medium text-gray-600">{index + 1}.</span> {step}
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Sections */}
        {content.sections && content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 
              className="text-xl mb-2 max-w-lg mx-auto"
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '700',
                lineHeight: '1.15',
                color: '#171717',
                letterSpacing: '0.18px',
              }}
            >
              {section.title}
            </h2>
            <p 
              className="text-sm mb-4 max-w-lg mx-auto"
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#495057',
                lineHeight: '1.6',
                fontWeight: '400',
              }}
            >
              {section.content}
            </p>
            {section.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-auto"
                />
              </div>
            )}
            {section.video && (
              <div className="mt-4">
                <VideoPlayer src={section.video} />
              </div>
            )}
          </div>
        ))}

        {/* Feature Navigation */}
        {(content.previousFeature || content.nextFeature) && (
          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-start">
              {/* Previous Feature */}
              {content.previousFeature && (
                <div className="text-left">
                  <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2">PREVIOUS FEATURE</p>
                  <a 
                    href={content.previousFeatureUrl}
                    className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ 
                      fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
                      color: '#171717',
                      fontSize: '22px',
                      fontWeight: '700',
                      letterSpacing: '0.28px',
                      lineHeight: '115%'
                    }}
                  >
                    <span style={{ color: '#000000', fontSize: '22px', fontWeight: '700' }}>&lt;</span>
                    {content.previousFeature}
                  </a>
                </div>
              )}
              
              {/* Next Feature */}
              {content.nextFeature && (
                <div className="text-right ml-auto">
                  <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2">NEXT FEATURE</p>
                  <a 
                    href={content.nextFeatureUrl}
                    className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ 
                      fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
                      color: '#171717',
                      fontSize: '22px',
                      fontWeight: '700',
                      letterSpacing: '0.28px',
                      lineHeight: '115%'
                    }}
                  >
                    {content.nextFeature}
                    <span style={{ color: '#000000', fontSize: '22px', fontWeight: '700' }}>&gt;</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturePage

