import React from 'react';
import '../app/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsConditions: React.FC = () => {
    return (
        <div className="bg-gray-50 text-black min-h-screen pb-12">
            <Header />
            <div className="relative top-0 left-0 lg:pl-12 md:pl-12 sm:pl-8 w-full h-full flex flex-col py-48 mb-20 justify-center items-start  bg-black">
                <h1 className="text-white lg:text-7xl md:text-5xl text-4xl sm:text-4xl  mb-1 font-bold">Terms & Conditions</h1>
                <p className="text-white lg:text-xl md:text-lg sm:text-base font-normal">Website and business terms and conditions</p>
            </div>
            <div className="min-h-screen text-left justify-left bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-8">Website terms and conditions</h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Welcome to our website. If you continue to browse and use this website, you are agreeing to
                        comply with and be bound by the following terms and conditions of use, which together with our
                        privacy policy govern Grey InfoTech Limited’s relationship with you in relation to this website.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        If you disagree with any part of these terms and conditions, please do not use our website.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        The term ‘Grey InfoTech Limited’ or ‘us’ or ‘we’ refers to the owner of the website, whose
                        registered office is at 26 Alpha Gardens Estate, Akpajo Farm Road, Akpapjo-Eleme, Rivers State -
                        501101, Nigeria. Our company registration number is 1953845. The term ‘you’ refers to the user
                        or viewer of our website.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        The use of this website is subject to the following terms of use:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        The content of the pages of this website is for your general information and use only. It is
                        subject to change without notice.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
                        timeliness, performance, completeness or suitability of the information and materials found or
                        offered on this website for any particular purpose. You acknowledge that such information and
                        materials may contain inaccuracies or errors and we expressly exclude liability for any such
                        inaccuracies or errors to the fullest extent permitted by law.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Your use of any information or materials on this website is entirely at your own risk, for which
                        we shall not be liable. It shall be your own responsibility to ensure that any products,
                        services or information available through this website meet your specific requirements.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        This website contains material which is owned by or licensed to us. This material includes, but
                        is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited
                        other than in accordance with the copyright notice, which forms part of these terms and
                        conditions.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        All trademarks reproduced in this website, which are not the property of, or licensed to the
                        operator, are acknowledged on the website.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Unauthorised use of this website may give rise to a claim for damages and/or be a criminal
                        offence.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        From time to time, this website may also include <a href="/Links"
                                                                            className="text-black font-bold">links</a>
                        to other websites. These links are provided for your convenience to provide further information.
                        They do not signify that we endorse the website(s). We have no responsibility for the content of
                        the
                        linked website(s).
                    </p>
                    <p className="text-[15px] text-gray-600 mb-9">
                        Your use of this website and any dispute arising out of such use of the website is subject to
                        the laws of Nigeria.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">Grey InfoTech Terms and Conditions</h1>
                    <p className='text-[17px] text-gray-600 font-medium mb-6'>
                        1.<a className='text-black font-bold'>DEFINITION</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Acceptance:</a> the acceptance by Client of a Deliverable;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Client Materials:</a> the materials provided to Grey
                        InfoTech
                        by (or on behalf of) Client from time to time hereunder;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Confidential Information:</a> all information whether
                        technical
                        or commercial (including the business affairs, products, developments, trade secrets
                        specifications,
                        drawings, designs, disclosed in writing, on disc, orally or by inspection of documents or
                        pursuant to
                        discussions between the parties), where the information is identified (or reasonably
                        identifiable) as
                        confidential at the time of disclosure;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Defect:</a> a substantial defect in the Software which
                        materially
                        impairs the functionality of the Software and materially affects its capability to perform in
                        accordance
                        with the Specification;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Deliverables:</a> the materials listed in the applicable
                        Statement of Work;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Developer Tools:</a> content and materials (including any
                        software)
                        owned and/or controlled by Grey InfoTech prior to the date of this Agreement, which for the
                        avoidance of
                        doubt shall include all Intellectual Property Rights therein;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Intellectual Property Right:</a> all intellectual property
                        rights
                        wherever in the world arising, whether registered or unregistered (and including any
                        application), including
                        copyright, confidential information, trade secrets, trademarks, design rights, database rights
                        and all other
                        similar rights;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Project:</a> the provision by Grey InfoTech of the Services
                        for a particular
                        purpose as detailed in the applicable Statement of Work;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Services:</a> the services provided by Grey InfoTech
                        pursuant to this Agreement;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Software:</a> the software for Client’s website and/or app
                        as described in the
                        applicable Statement of Work;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Specification:</a> the functional and technical
                        specification for the Software
                        as agreed from time to time;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Statement of Work:</a> the applicable Statement of Work,
                        completed and signed by the parties, for each Project;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Terms and Conditions:</a> the terms and conditions set out
                        below;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Third Party Materials:</a> any content or software not
                        created or owned by Client or Grey InfoTech;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        <a className='font-bold text-black'>Timetable:</a> the timetable for provision of the Services
                        listed in the Statement of Work.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        2.<a className='text-black font-bold'>GREY INFOTECH OBLIGATIONS</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        In consideration of the Fees, Grey InfoTech agrees to provide the Services as detailed in the
                        applicable Statement of Work and in accordance with these Terms and Conditions.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        3.<a className='text-black font-bold'>CLIENT OBLIGATIONS</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        3.1 Client acknowledges that Grey InfoTech’ ability to provide the Services is dependent upon
                        the
                        full and timely cooperation of Client (which Client agrees to provide) as well as the accuracy
                        and completeness of the design specifications and other information and data Client provides to
                        Grey InfoTech. Accordingly, Client shall:
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        3.1.1 pay the Fees promptly when due in accordance with the Applicable Statement of Work;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        3.1.2. Client will notify Grey InfoTech of any changes to services in writing, giving 30 days’
                        notice. During the notice period, fees shall be charged at the rate before the notice.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        3.1.3 promptly deliver to Grey InfoTech all required drafts, concepts, text, graphics, logos,
                        photographs, images, moving images, sound, illustrations and other materials for use in
                        accordance with this Agreement in the agreed format and ensure that it is correct and up to
                        date; and
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        3.1.4 where any materials are supplied by Client or a third party for the purposes of a Project,
                        timely deliver (or procure the timely delivery of) such materials to Grey InfoTech (and where
                        Client fails to provide, or is delayed in providing any such materials, the Timetable shall be
                        suspended or adjusted accordingly).
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        4.<a className='text-black font-bold'>TESTING AND ACCEPTANCE OF SOFTWARE</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        4.1 Following (each) delivery of Software, Grey InfoTech shall provide Client with a test
                        version
                        or temporary URL where the Software can be viewed and tested. If in the course of acceptance
                        testing the Software fails to substantially comply with the Specification, Client shall promptly
                        advise Grey InfoTech in writing detailing all present Defects. On receipt of notice, Grey
                        InfoTech shall
                        investigate and make appropriate changes or corrections necessary to correct existing Defects.
                        Following such changes Client shall re-test the Software and, if no Defects are detected, Client
                        shall confirm Acceptance. If further Defects are detected, another round of correction and
                        subsequent re-test shall be conducted (each such round of correction and testing being known
                        as an “<a className='text-black font-bold'>Iteration</a>”) until such time as the Defects are
                        remedied and upon which Client shall confirm Acceptance. For the avoidance of doubt,
                        Grey InfoTech shall have no obligation to make any changes or corrections where this would
                        result in the Software operating in a manner not required under the Specification.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        4.2 If any failure to pass an acceptance test results from a Defect which is caused by an act or
                        omission of Client or by one of Client’s sub-contractors or agents for which Grey InfoTech has
                        no
                        responsibility or by any Third Party Materials, Acceptance of the Software shall be deemed to
                        have taken place notwithstanding such non-Grey InfoTech Defect(s). If so requested, Client shall
                        pay Grey InfoTech in full for all such additional services and products at Grey InfoTech’
                        then-current
                        fees and prices. If a delay in achieving an Acceptance is due to any cause beyond the reasonable
                        control of Grey InfoTech, the relevant agreed date for delivery shall be deferred.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        4.2.1 Acceptance shall be deemed to have taken place upon the occurrence of any of the following
                        events:
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        4.2.2 Client uses any part of the Software “live” (e.g. for any revenue-earning or other
                        non-testing purposes); or
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        4.2.3 Client delays the start of relevant acceptance tests or any retest for a period of five
                        (5) days from the date when Grey InfoTech is ready to commence tests or retests; or
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        4.2.4 Client unreasonably delays confirming an Acceptance for more than three (3) business days.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        5.<a className='text-black font-bold'>STATEMENTS OF WORK</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        5.1 The parties acknowledge and agree that an agreed Statement of Work may not fully specify the
                        Deliverables and Specification at the date of such Statement of Work. The parties will work
                        together to further develop the requirements during the provision of the Services during the
                        Term. Client agrees to collaborate and provide clear feedback at all times in relation to
                        further
                        scoping the Deliverables and the Specification. All requirements will be based on the
                        discussions,
                        pitch materials and other instructions received from Client from time to time, which will assist
                        in defining the requirements and limitations of the Deliverables. The parties acknowledge and
                        agree that some aspects of the Deliverables and Specification will develop during the project,
                        however, any requirements that Grey InfoTech reasonably believes are outside of scope, will be
                        dealt
                        with as a change under Clauses 5.2 and 5.3 below.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        5.2 Any request for changes or alterations to a particular Statement of Work must be in writing
                        and shall be subject to each party’s approval in writing.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        5.3 Client may request in writing that Grey InfoTech cancel or amend any plans, schedules or
                        work
                        in progress in relation to the Services and Grey InfoTech will use reasonable endeavours to
                        comply
                        with any such request or, where appropriate, use reasonable endeavours to agree changes to the
                        Specification, Deliverables, pricing, timetable and any other relevant terms. For the avoidance
                        of doubt, in the event of any resulting amendment the Fees payable by Client may be increased as
                        reasonably commensurate with such changes to the Services, provided that in no event shall the
                        Fees be reduced below the agreed minimum amount (if any) and provided that in any event Client
                        shall reimburse Grey InfoTech for all charges and/or expenses incurred by Grey InfoTech and/or
                        to
                        which Grey InfoTech is or was committed in relation to the Services at the time of amendment (or
                        cancellation or termination) of this Agreement, including any charges imposed on Grey InfoTech
                        by
                        third parties arising therefrom.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        6.<a className='text-black font-bold'>PROJECT MANAGEMENT</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        6.1 Client shall nominate and notify to Grey InfoTech a named individual who shall be available
                        to
                        respond to Grey InfoTech’ enquiries and who shall manage the receipt of the Services. Such
                        individual shall act promptly and fairly at all times and in particular shall remain reasonably
                        available and contactable at all time as reasonably required for the requirements of the
                        project.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        6.2 Client acknowledges and agrees that Grey InfoTech’ business hours are 8:00am to 6:00pm on
                        any
                        working day other than a Saturday, a Sunday or public or bank holiday in Nigeria, and Grey
                        InfoTech
                        will not normally perform services or respond to communications outside of these hours (unless
                        by
                        prior written agreement of the parties).
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        7.<a className='text-black font-bold'>FEES AND PAYMENT</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        7.1 In consideration of the Services, Client shall pay to Grey InfoTech the Fees (excluding any
                        and
                        all applicable VAT and similar taxes, transfer charges and/or approved expenses), according to
                        the terms of payment as listed in the applicable Statement of Work and Grey InfoTech’ invoices.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        7.2 Client shall pay the sums set out in Grey InfoTech’ invoices in each case within fourteen
                        (14)
                        days of the date of the relevant invoice.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        7.3 All sums due hereunder shall be paid in full without any right of set-off or deduction, are
                        exclusive of VAT and shall be paid in Naira, Euro, Sterling Pounds or United States Dollars,
                        unless
                        otherwise agreed in writing.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        7.4 If Client fails to pay any amount payable by it under this Agreement, Grey InfoTech shall be
                        entitled to charge interest on the overdue amount, payable forthwith on demand from the due date
                        up to the date of actual payment, after as well as before judgment, at the rate of 8% per annum
                        above the base rate for the time being of Kuda Microfinance Bank, CLear Junction limited or
                        Community Federal Savings Bank. Such interest shall accrue on a daily basis and be compounded
                        quarterly.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        8.<a className='text-black font-bold'>INTELLECTUAL PROPERTY RIGHTS</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        8.1 Save for Developer Tools and/or any Third Party Software (and subject always to full payment
                        of all sums payable under the relevant Statement of Work), all Intellectual Property Rights in
                        the Software and other Deliverables developed by Grey InfoTech hereunder shall be assigned to,
                        and
                        shall be the property of, Client.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        8.2 Any Third Party Software used within Deliverables (including Open Source materials) will be
                        supplied in accordance with the relevant licensor’s standard terms. Upon Acceptance and subject
                        to compliance by Client with the terms herein, Grey InfoTech shall grant to Client a
                        non-exclusive,
                        non-transferable sub-licence to use all Developers Tools incorporated within the Deliverables
                        for
                        the purposes of use of the Software in accordance with the terms herein and subject always to
                        the
                        terms of the licence granted to Client for the same as detailed in the applicable Statement of
                        Work.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        9.<a className='text-black font-bold'>WARRANTIES AND INDEMNITIES</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.1 Each party warrants that it has full power and authority to enter into and perform this
                        Agreement.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.2 Grey InfoTech warrants:
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.2.1 that it shall perform the Services with reasonable care and skill in accordance with
                        standards generally observed in the industry for similar services;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.2.2 use of the Software by Client as set out herein will not infringe the intellectual
                        property
                        rights of any third party; and,
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.2.3 the Software will perform in accordance with the Specification for a period of sixty days
                        (60) days from Acceptance (and if the Software does not so perform, than, absent fault of
                        Client,
                        Grey InfoTech shall take action to ensure that the Software complies with the Specification
                        and/or
                        provide a reasonably-suitable replacement).
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.3 The warranties above shall not apply to the extent that any failure of the Deliverables to
                        perform substantially in accordance with the Specification is caused by any Client Materials or
                        any negligent act or omission of Client or a third party.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.4 Grey InfoTech shall indemnify Client against all damages, losses and expenses arising as a
                        result
                        of any action or claim that use by Client of the Software in accordance with the terms herein
                        infringes any Intellectual Property Rights of a third party.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.5 Client shall indemnify Grey InfoTech against all damages, losses and expenses arising as a
                        result
                        of any action or claim that any use by Grey InfoTech of Client Materials infringes any
                        Intellectual
                        Property Rights of a third party.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.6 The indemnities hereunder shall be subject always to the following provisos:
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.6.1 the indemnified party promptly notifies the indemnifier in writing of the claim;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.6.2 the indemnified party makes no admissions or settlements without the indemnifier’s prior
                        written consent;
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.6.3 the indemnified party gives the indemnifier all information and assistance as the
                        indemnifier
                        may reasonably require; and
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.6.4 the indemnified party allows the indemnifier complete control over the litigation and
                        settlement of any action or claim.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        9.7 Client acknowledges and agrees that use of Deliverables in certain territories may be
                        subject
                        to applicable local law, regulation, industry guidelines or other requirements (including
                        without
                        limitation NCC Guidelines for use of advertising content) and that, unless specifically
                        requested in writing and agreed by the parties, Grey InfoTech shall provide no legal
                        information,
                        guidance or advice in relation to any such requirements or restrictions.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        10.<a className='text-black font-bold'>LIMITATION OF LIABILITY</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        10.1 Nothing in this Agreement shall operate to exclude or limit either party’s liability for
                        death or personal injury caused by its negligence or any other liability which cannot be
                        excluded
                        or limited under applicable law.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        10.2 Grey InfoTech shall not be liable to Client for any damage to or loss of software, content or
                        data, loss of profit, anticipated profits, revenues, anticipated savings, goodwill or business
                        opportunity, or for any indirect or consequential loss or damage.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        10.3 Subject to Clause 10.1, Grey InfoTech’ aggregate liability in respect of claims based on
                        events
                        arising out of or in connection with this Agreement or any collateral contract, whether in
                        contract or tort (including negligence) or otherwise, shall in no circumstances exceed the
                        total sums actually received by Grey InfoTech hereunder.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        10.4 This Agreement sets out the full extent of Grey InfoTech’ obligations and liabilities in
                        respect
                        of the supply of the Services. All conditions, warranties or other terms concerning the Services
                        which might otherwise be implied into this Agreement or any collateral contract (whether by
                        statute or otherwise) are hereby expressly excluded.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        11.<a className='text-black font-bold'>TERM AND TERMINATION</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        11.1 This Agreement shall commence on signature and shall (subject to earlier termination
                        pursuant
                        to this Clause 11) terminate on the later of Acceptance and payment of all outstanding Fees and
                        costs.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        11.2 Either party may terminate this Agreement immediately at any time by written notice to the
                        other party if:
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        11.2.1 that other party commits any material breach of its obligations under this Agreement
                        which
                        (if remediable) is not remedied within 30 (thirty) days after the service of written notice
                        specifying the breach and requiring it to be remedied; or
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        11.2.2 that other party ceases to trade (either in whole, or as to any part or division involved
                        in the performance of this Agreement) or becomes insolvent or unable to pay its debts within the
                        meaning of the insolvency legislation applicable to that party; or a person (including the
                        holder
                        of a charge or other security interest) is appointed to manage or take control of the whole or
                        part of the business or assets of that party; or the ability of that party’s creditors to take
                        any action to enforce their debt is suspended, restricted or prevented or some or all of that
                        party’s creditors accept, by Agreement or pursuant to a court order, an amount of less than the
                        sums owing to them in satisfaction of those sums; or any process is instituted which could lead
                        to that party being dissolved and its assets being distributed to its creditors, shareholders or
                        other contributors (other than for the purposes of solvent amalgamation or reconstruction).
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        11.3 On early termination of this Agreement pursuant to Clause 11.2, each party shall promptly
                        return all proprietary material and Confidential Information provided to it hereunder.
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        12.<a className='text-black font-bold'>DATA PROTECTION, CONFIDENTIALITY AND REGULATORY
                        COMPLIANCE</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        12.1 Each party shall comply with all applicable data protection, privacy or similar laws or
                        regulations including without limitation the General Data Protection Regulations 2018 (“<a
                        className='text-black font-bold'>
                        Data Protection Laws</a>”) and shall render such assistance and co-operation as is reasonably
                        necessary or reasonably requested by the other party.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        12.2 Each party shall not disclose the other party’s Confidential Information to any third
                        party,
                        and shall protect the Confidential Information of the other party against unauthorised
                        disclosure
                        by using the same degree of care as it takes to preserve and safeguard its own confidential
                        information of a similar nature, being at least a reasonable degree of care.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        12.3 Confidential Information may be disclosed by the receiving party to its employees,
                        affiliates
                        and professional advisers, provided the recipient is bound to maintain the confidentiality of
                        the
                        Confidential Information received.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        12.4 The obligations set out in this Clause 12 shall not apply to Confidential Information which
                        the receiving party can demonstrate: (i) is or has become publicly known other than through
                        breach
                        of this Agreement; (ii) was in possession of the receiving party prior to disclosure by the
                        other
                        party; (iii) was received by the receiving party from an independent third party who has full
                        right
                        of disclosure; (iv) was independently developed by the receiving party; or (v) was required to
                        be
                        disclosed by governmental authority, provided that the party subject to such requirement to
                        disclose
                        gives the other prompt written notice of the requirement.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        12.5 Client acknowledges that Grey InfoTech shall not at any time give advice or direction in
                        relation
                        to any regulatory or legal matters, or security requirements or best practice, including in
                        relation
                        to Data Protection, privacy, contract terms or payment processing requirements and/or PCI
                        compliance.
                        Client confirms and agrees that it shall take its own advice and be solely responsible (to the
                        exclusion of Grey InfoTech) in relation to all such matters (including without limitation the
                        vetting
                        or selection of and third parties or Third Party Software and the integration of the
                        Deliverables
                        with the same).
                    </p>
                    <p className='text-[17px] text-gray-600 font-medium mb-7'>
                        13.<a className='text-black font-bold'>GENERAL</a>
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.1 For the purposes of this Agreement, “<a className='text-black font-bold'>Force Majeure Event</a>”
                        shall mean any event arising
                        which is beyond the reasonable control of the affected party (including any industrial dispute
                        affecting any third party, governmental regulations, fire, flood, disaster, civil riot or war).
                        A party who becomes aware of a Force Majeure Event which gives rise to or which is likely to give
                        rise to any failure or delay in performing its obligations under this Agreement shall forthwith
                        notify the other and shall inform the other of the period for which it is estimated that such
                        failure or delay shall continue. Each affected party shall take reasonable steps to mitigate the
                        effect of the Force Majeure Event.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.2 Client may not assign or transfer any of its rights or obligations under this Agreement
                        without the prior written consent of Grey InfoTech.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.3 This Agreement is made for the benefit of the parties to it and is not intended to benefit,
                        or be enforceable by, any third party.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.4 This Agreement constitutes the entire agreement between the parties and shall supersede all
                        promises, representations, warranties or other statements (whether written or oral) given by one
                        party to the other concerning such subject matter, provided that nothing in this clause shall
                        operate to exclude either party’s liability for any fraudulent misstatement or fraudulent concealment.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.5 The failure or neglect by either party to enforce at any time, or for any period, any of the
                        terms and/or conditions of this Agreement shall not be construed nor shall be deemed to be a
                        waiver of them or of the right at any time subsequently to enforce all such terms and/or conditions
                        of this Agreement.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.6 If any court of competent jurisdiction holds any provision of this Agreement invalid, illegal
                        or unenforceable for any reason, such provision shall be severed and the remainder of the provisions
                        hereof shall continue in full force and effect so as to leave the validity of the other provisions
                        of this Agreement intact.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.7 Client shall not, without the prior written consent of Grey InfoTech, at any time during Term
                        and for twelve months thereafter, solicit or entice away from Grey InfoTech or employ or attempt to
                        employ or engage any person who is, or has been, engaged as an employee, consultant or subcontractor
                        of Grey InfoTech in the provision of the Services.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.8 This Agreement may not be modified or amended except in writing by a duly authorised representative
                        of each party.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.9 Nothing in this Agreement shall constitute, or be deemed to constitute a relationship of
                        partnership or profit sharing in the nature of a partnership between the parties nor, except as
                        expressly provided, shall either party be deemed to be the agent of the other.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.10 In the case of any conflict or inconsistency between the Statement of Work and these Terms
                        and Conditions, these Terms and Conditions shall prevail.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.11 The parties hereby agree that this Agreement shall be construed in accordance with English
                        Law and the parties hereby submit to the exclusive jurisdiction of the English Courts.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        13.12 Any notice or other communication given under this Agreement must be in writing and served 
                        on a party by first class mail or recorded delivery post to the contact details at the start of 
                        this Agreement or as otherwise notified in writing.  Notices or communications sent by first class 
                        or recorded delivery post will be deemed to be served three (3) business days following the day of
                        posting.
                    </p>
                        <div className="mt-8 flex flex-col border-b md:flex-row justify-between items-center"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TermsConditions;