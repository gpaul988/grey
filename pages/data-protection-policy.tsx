import React from 'react';
import '../app/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const DataProtectionPolicy = () => {
    return (

        <div className="bg-gray-50 text-black min-h-screen pb-12">
            <Header/>
            <div
                className="relative top-0 left-0 lg:pl-12 md:pl-12 sm:pl-8 w-full h-full flex flex-col py-48 mb-20 justify-center items-start bg-black">
                <h1 className="text-white lg:text-7xl md:text-5xl text-4xl sm:text-4xl  mb-1 font-bold lg:mr-[698px] lg:break-words ">Data
                    Protection Policy</h1>
            </div>
            <div className="min-h-screen text-left justify-left bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6"
                    >Purpose</h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        This Notice outlines the data protection policies and procedures we have adopted and to which we
                        abide to ensure we are GDPR compliant. The purpose of this Notice and any other documents
                        referred to in it is to clearly list and identify the legal requirements, procedures and rights
                        which must be established when we obtain, process, transfer and/or store your personal data.
                        This Notice will assist you in understanding the obligations, responsibilities and rights which
                        arise from the Data Protection Laws.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Introduction
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Everyone has rights with regard to the way in which their personal data is handled. In order to
                        operate efficiently, we need to collate and use information about the people with whom we work.
                        This includes current, past and prospective employees, clients, and others with whom we
                        communicate.
                    </p>
                    <p className={"text-[15px] text-gray-600 mb-6"}>
                        We regard the lawful and correct treatment of personal information as integral to the successful
                        operation and to maintain the confidence of the people we work and communicate with. To this
                        end,
                        we fully endorse and adhere to the principles of the relevant Laws.
                    </p>
                    <p className={"text-[15px] text-gray-600 mb-6"}>
                        We are registered as a Data Controller on the Register kept by the Information Commissioner’s
                        Office.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Definitions in this Privacy Notice
                    </h1>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Data:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Information stored electronically, on a computer, server or in certain paper-based filing
                        systems.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Data Controller:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Grey InfoTech Limited has determined the purposes for which and the way in which, your Personal
                        Data
                        is processed. The Data Controller has overall responsibility for compliance with the Data
                        Protection
                        Laws. Any questions about the operation of this Notice or any concerns that the Notice has not
                        been
                        followed should be referred in the first instance to Grey InfoTech Limited at 26 Alpha Garden
                        Estate,
                        Akpajo Farm Road, Akpajo-Eleme, Rivers State - 501101, Nigeria.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Privacy Manager:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Grey InfoTech has an appointed officer who is responsible for awareness- raising, training staff
                        and
                        informing and advising the Data Controller, Data Processors and Data Users how to ensure
                        compliance
                        with the enactments, and to monitor that compliance. The Data Officer can be contacted at 26
                        Alpha
                        Garden Estate, Akpajo Farm Road, Akpajo-Eleme, Rivers State - 501101, Nigeria.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Data Processor:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Any person or organisation that is not a Data User that processes personal data on our behalf
                        and
                        in accordance with our specific instructions. Our staff will be excluded from this definition
                        but,
                        the definition could include suppliers who handle personal data on our behalf.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Data Subjects:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        All living individuals about whom we hold Personal Data. All Data Subjects have legal rights
                        concerning the processing and storage of their personal information.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Data users:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Our employees whose work involves processing your Personal Data. Data users are responsible for
                        the proper use of the data they process and must protect the data they handle in accordance with
                        this Notice.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        The Enactments:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        The Data Protection Act 1998 (the Act) up to and until 25 May 2018 after which The General Data
                        Protection Regulations 2017 (GDPR) will apply, both of which regulate the way in which all
                        Personal Data is held and processed.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Personal Data:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Information which can be used to directly or indirectly identify a living individual.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Processing:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Any activity in which the data is used, including (but not limited to) obtaining, recording,
                        organising, amending, retrieving, using, disclosing, erasing, destroying and/or holding the
                        data. The term “processing” also includes transferring personal data to third parties.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Supervisory Authority:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        The Authorised Body which is empowered to govern and manage how the GDPR is implemented and
                        aided by in Nigeria. In the case of the Nigeria, The Nigeria Data Protection Commission is the
                        relevant body.
                    </p>
                    <p className="text-[17px] text-grey-700 font-bold mb-6">
                        Sensitive Personal Data:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        This includes information about a person’s race, ethnicity, political opinions, convictions,
                        religion, trade union membership, physical and/or mental health, and sexual preference.
                        Sensitive personal data can only be processed with the express written consent of the person
                        concerned
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Notice Statement
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        In accordance with the GDPR anyone processing Personal Data must comply with the six principles
                        of good practice. These provide that Personal Data must:
                    </p>
                    <ol className='text-[15px] text-gray-600 mb-6 list-decimal list-inside'>
                        <li className='mb-4'>Be processed fairly, lawfully and transparently;</li>
                        <li className='mb-4'>Only be used for the purpose for which it was collected;</li>
                        <li className='mb-4'>Be adequate, relevant and not excessive for the purpose for which it is
                            being processed;
                        </li>
                        <li className='mb-4'>Be accurate and kept up-to-date;</li>
                        <li className='mb-4'>Not be kept longer than necessary to fulfil the purpose of its collection;
                            and
                        </li>
                        <li className='mb-4'>Be kept secure and protected from unauthorised processing, loss, damage or
                            destruction
                            [which includes the data not being transferred to a country or territory outside Nigeria
                            unless the Personal Data is adequately protected and/or consent of the Data Subject has
                            been provided].
                        </li>
                    </ol>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        1. Fair, Lawful and Transparent Processing
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        For Personal Data to be processed lawfully, the basis for the processing must be one of the
                        legal
                        grounds set out in the Enactments. These include, among other things, your written consent to
                        the
                        processing, or that the processing is necessary for the performance of our services contract
                        with you.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        In the event we collect Personal Data directly from you, this Notice should assist in informing
                        you about:
                    </p>
                    <ol className='text-[15px] text-gray-600 mb-6 list-decimal list-inside'>
                        <li className='mb-4'>The purpose or purposes for which we intend to process your Personal
                            Data.
                        </li>
                        <li className='mb-4'>The types of third parties, if any, with which we may share or disclose
                            your personal Data.
                        </li>
                        <li className='mb-4'>He means with which you can limit our processing and disclosure of your
                            Personal Data.
                        </li>
                    </ol>
                    <p className="text-[15px] text-gray-600 mb-6">
                        If we receive Personal Data about you from other sources, we will provide you with this
                        information as soon as possible thereafter.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        When sensitive personal data is being processed, additional conditions and securities must be in
                        place to ensure protection
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        2. Processing for Limited Purposes
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        In the course of our business, we shall process the Personal Data we receive directly from you
                        (for example, by you completing forms, sending us papers or from you corresponding with us by
                        mail,
                        phone, email or otherwise) and your Personal Data which we receive from any other source.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We shall only process your Personal Data to fulfil and/or enable us to satisfy the terms of our
                        obligations and responsibilities in our role as your <Link href='/public'
                                                                                className='text-gray-700 font-bold hover:text-teal-700'> digital
                        agency </Link> or for any other specific purposes
                        permitted by the Enactments. Should we deem it necessary to process your Personal Data for
                        purposes
                        outside and/or beyond the reasons for which it was originally collected, we will contact you
                        first,
                        to inform you of those purposes and our intent and may also apply for your consent.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        3. Adequate, Relevant and Non-Excessive Processing
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We will only collect and process your Personal Data as required to fulfil the specific purpose/s
                        of our contract and agreements with you.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        4. Accurate and Up-to-Date Data
                    </h1>
                    <p className={"text-[15px] text-gray-600 mb-6"}>
                        We shall ensure that all Personal Data held is accurate and up to date and will check the
                        accuracy
                        of any Personal Data at the point of collection and at regular intervals afterwards. If you
                        become
                        aware that any of your Personal Data is inaccurate, you are entitled to contact us and request
                        that
                        your Personal Data is amended. We will take all reasonable steps to destroy or amend inaccurate
                        or
                        out-of-date data.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        5. The Timely Processing of Data
                    </h1>
                    <p className={"text-[15px] text-gray-600 mb-6"}>
                        We will not keep Personal Data longer than is necessary for the purpose or purposes for which it
                        was collected. Once Personal Data is no longer required, we will take all reasonable steps to
                        destroy
                        and erase it.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        6. Keeping Your Personal Data Secure
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Our employees and contracted personnel are bound to our privacy policies, procedures and
                        technologies
                        which maintain the security of all your personal data from the point of collection to the point
                        of
                        destruction.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We maintain data security by protecting the confidentiality, integrity and availability of your
                        Personal Data, and when we do so we abide by the following definitions:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.1 Confidentiality:</a> We ensure that the only people
                        authorised to use your personal data can access
                        it. [Employees are prohibited from accessing and viewing your personal data unless it is
                        necessary
                        to do so]
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.2 Integrity:</a> We ensure that your personal data is
                        accurate and suitable for the purpose for which it is processed.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.3 Availability:</a> We have established procedures
                        which
                        mean only our authorised Data Users should be able to access your Personal Data if they need it
                        for
                        authorised purposes.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We also maintain security procedures which include, but are not limited to:
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.4</a>Secure lockable server cabinets, desks and
                        cupboards.
                        Server cabinets are always kept locked. Desks and cupboards shall be kept locked if they hold
                        your
                        personal data.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.5</a> Methods of disposal. Paper documents containing
                        Personal Data are shredded and digital storage devices shall be physically destroyed when they
                        are no longer required.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.6</a> Data Users shall be appropriately trained and
                        supervised in accordance with this Notice which includes requirements that computer monitors do
                        not show confidential information to passers-by and that Data Users log off from or lock their
                        PC/electronic device when it is left unattended.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.7</a> Our computers have appropriate password security,
                        boundary firewalls and effective anti-malware defences. We routinely back-up electronic
                        information
                        to assist in restoring information in the event of a disaster and our software is kept
                        up-to-date
                        with the latest security patches.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.8</a> One or all of the following measures shall be
                        applied to the personal data held; separating the personal data and/or pseudonymisation and/or
                        the encoding of the data
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-gray-800 font-bold'>6.9</a> Our Privacy Manager will ensure that this Notice
                        is kept updated in response to any amendments to the Law.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We shall take appropriate security measures against unlawful and/or unauthorised processing of
                        personal data, and against the accidental loss of, or damage to, your Personal Data.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We shall only transfer your Personal Data to a Data Processor (a Data User outside our business)
                        if the Processor agrees to comply with our procedures and policies, or if the Processor puts in
                        place security measures to protect Personal Data, which we consider adequate and are in
                        accordance
                        with the Enactments.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Transferring Personal Data Outside Nigeria
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We shall only transfer your Personal Data to countries outside Nigeria if one of the following
                        conditions applies:
                    </p>
                    <ol className='text-[15px] text-gray-600 mb-6 list-none list-inside'>
                        <li className='mb-4 before:content-["—"] before:mr-2'>The country to which your Personal Data
                            shall
                            be transferred ensures an adequate level of protection and can ensure your legal rights and
                            freedoms
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>You have given your consent that your
                            Personal
                            Data is transferred
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>The transfer is necessary for one of the
                            reasons
                            set out in the Enactments, including the performance of a contract between you and us, or to
                            protect
                            your vital interests.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>The transfer is legally required on
                            important
                            public interest grounds or for the establishment, exercise or defence of legal claims.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>The transfer is authorised by the NDPB and
                            we
                            have received evidence of adequate safeguards being in place regarding the protection of
                            your
                            privacy, your fundamental rights and freedoms, and which allow your rights to be exercised.
                        </li>
                    </ol>
                    <p className="text-[15px] text-gray-600 mb-6">
                        The Personal Data we hold may also be processed by staff operating outside Nigeria who work for
                        us or for one of our suppliers. Those Data Users may be engaged in, among other things, the
                        fulfilment
                        of contracts with you, such as the processing of payment details and/or the provision of support
                        services.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        How We Will Use Your Personal Data
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We will only collect and process your Personal Data to the extent that it is needed to fulfil
                        our
                        operational and contractual needs or to comply with any legal requirements.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We shall access and use your Personal Data in accordance with your instructions and as is
                        reasonably
                        necessary:
                    </p>
                    <ol className='text-[15px] text-gray-600 mb-6 list-none list-inside'>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            To fulfil our contractual obligations and responsibilities to you;
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            To provide, maintain and improve our agency services;
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            We do not intend to use your personal data for the advertising and marketing of our services
                            and/or the services of our affiliates. In the very unlikely event that this will change, we
                            shall seek your separate express consent and you are entitled to opt out of these services at
                            any time.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            To respond to your requests, queries and problems;
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            to inform you of any changes to our services and related notices, such as security and fraud notices.
                        </li>
                    </ol>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        When We May Share Your Personal Data
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        There are times when we may need to share your Personal Data. This section discusses how and when
                        we might share your Data.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        In the course of us fulfilling our role as your digital agency it will be necessary for us to disclose
                        your Personal Data in certain situations:
                    </p>
                    <ol className='text-[15px] text-gray-600 mb-6 list-none list-inside'>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            In our role as your digital agency, we may need to share your Personal Data with certain bodies
                            to fulfil our contract with you such as your suppliers, contractors and sub-contractors, regulatory
                            bodies.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            The software provider we use to process electronic data, including personal data, is GSuite
                            (Email and Document Management ) These providers state that they are GDPR compliant and/or
                            applies equivalent/adequate safeguards:<br/> <a href='https://cloud.google.com/security/gdpr/'
                                                                            className='text-gray-800 font-bold hover:text-teal-700'>https://cloud.google.com/security/gdpr</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            There may also be situations in which it is necessary for us to disclose your personal data to
                            other third parties, which include, but are not limited to, other governmental, regulatory bodies
                            and law enforcement agencies.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            If we are under a duty to disclose or share your Personal Data in order to comply with any legal
                            obligation, lawful requests, court orders and legal process.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            To enforce or apply any contract or other agreement with you.
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            To protect our rights, property, or safety and that of our employees, members, or others, in
                            the course of investigating and preventing money laundering and fraud.
                        </li>
                        </ol>
                        <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                            Your Rights and Requests Concerning Your Personal Data
                        </h1>
                        <p className="text-[15px] text-gray-600 mb-6">
                            We will process and manage all your Personal Data in line with your rights; in particular, your
                            rights to:
                        </p>
                        <ol className='text-[15px] text-gray-600 mb-6 list-none list-inside'>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Request access to any data we hold about you;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Prevent the processing of your Personal Data for direct marketing purposes, if so instructed;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Ask to have inaccurate Personal Data amended;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Be forgotten, and have all relevant Personal Data erased (subject to our overriding legal
                                obligations);
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Prevent processing which is likely to cause damage or distress to you or anyone else;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Request certain restrictions on the processing of your Personal Data;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Receive a copy of your Personal Data and/or request a transfer of your Personal Data to
                                another Data Controller;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Not be subject to automated decision making;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                Be notified of a data security breach which affects your rights and freedoms, without undue
                                delay;
                            </li>
                            <li className='mb-4 before:content-["—"] before:mr-2'>
                                If you have provided your express consent that your Personal Data may be processed for
                                marketing and advertising purposes, you are entitled to withdraw that consent. Such a
                                withdrawal will not affect any processing of the data completed before consent was withdrawn;
                                and
                            </li>
                                <li className='mb-4 before:content-["—"] before:mr-2'>
                                    to make certain requests to us concerning how your Personal Data is managed.
                                </li>
                        </ol>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Access and Portability Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You are entitled to request access to your Personal Data unless providing a copy would adversely
                        affect the rights and freedoms of others.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You can also request information about the different categories and purposes of data processing;
                        recipients or categories of recipients who receive your Personal Data, details on how long your
                        Personal Data is stored for, information on your Personal Data’s source and whether the Data
                        Controller uses automated decision-making.
                    </p>
                    <p className='text-[15px] text-gray-600 mb-6'>
                        You also have “Data Portability” rights which include the right to request a copy of your Personal
                        Data be sent to you or transmitted to another Data Controller.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Correction Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You are entitled to request we correct or complete your inaccurate or incomplete Personal Data
                        without undue delay and we will update the information and erase or correct any inaccuracies as
                        required.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Erasure Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You can exercise your “right to be forgotten” and can request we erase your Personal Data. Once
                        receiving a request we must erase the Personal Data without delay unless an exception applies
                        that permits us to continue processing your data. Details of such exceptions are contained in the
                        Enactments and include situations where we might need to retain the information to carry out our
                        official duties and/or comply with legal obligations and/or for the establishment of exercising
                        or defending legal claims, or it is in the public interest to retain your Personal Data.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Restriction Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You may request restrictions be applied to the processing of your Personal Data for some specific
                        reasons such as you contest the accuracy of the data, the processing is unlawful or if we no longer
                        need to process your Personal Data. You can also request restrictions be applied if the processing
                        is being done for public interest or third party reasons.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        If such a request is received we can continue to store your Personal Data, but may only process it
                        under certain circumstances, such as: you give consent for us to continue processing your data, we
                        need to establish, exercise or defend legal claims or we need to protect the rights of another
                        individual or legal entity or for important public interest reasons.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Objection Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You may also object to your Personal Data being processed under certain circumstances, including
                        for direct marketing purposes and profiling related to direct marketing.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        If we receive such an objection we will stop processing your Personal Data unless we can show a
                        compelling legitimate ground for processing your Personal Data which overrides your interests and
                        the basis of your request.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Your Telephone Queries and Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        When receiving telephone enquiries, in which Personal Data is requested we will only verbally disclose
                        Personal Data held on our systems if we can confirm the caller’s identity so as to ensure that the
                        data is only given to a person who is entitled to receive it.<br/><br/>
                        We may suggest that a caller put their request in writing to assist in establishing the caller’s
                        identity, and to enable us to clearly record the nature of the request and to assist in further
                        identity checks.<br/><br/>
                        If we have reasonable doubts about the identity of the person making the request, we may request
                        additional information to confirm the caller’s identity.<br/><br/>
                        In difficult situations, our Data Users may refer a request to their line manager for assistance.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Your Written Queries and Requests
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        When responding to written requests, Personal Data will only be disclosed if we can confirm the
                        identity of the sender and/or sufficient supporting evidence is provided by the sender establishing
                        their identity.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Changes to our Data Protection Policy
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We keep our privacy policy under regular review and reserve the right to amend and update the policy
                        as required. Where appropriate, we will notify you of those changes by mail or email.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
);
};

export default DataProtectionPolicy;