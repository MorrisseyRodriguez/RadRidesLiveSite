import React from 'react';

const sections = [
  {
    title: 'SECURITY DEPOSIT',
    body: `Renter will be required to provide a security deposit to Host. Security Deposit will be used first to settle any penalties and/or charges assessed against the rental. Any remaining deposit will be refunded except in the event of loss, damage or failure to comply with chargeable breaches. Host may, in lieu of the collection of a security deposit, retain a Renter's credit card on file. In the event of damage to Vehicle, Host will apply Security Deposit amount or charge credit card to cover the costs of necessary repairs or replacement of Vehicle. If cost to repair damage to or replace Vehicle exceeds the amount of Security Deposit, Renter will be responsible to pay excess balance to repair or replace Vehicle. Security Deposit refund can take up to seven (7) business days after the end of rental term. Renter will use the Vehicle only for personal or routine business use and operate the Vehicle only on properly maintained roads and parking lots. Renter will comply with all applicable laws relating to the operation of motor vehicles and skills pertaining to operation of motor vehicles. Renter shall not take Vehicle beyond the location limit of California without explicit permission or Renter will be charged a $500 a day penalty.`,
  },
  {
    title: 'DAMAGE',
    body: `Photos will be taken prior to Rental period documenting Vehicle condition, mileage and fuel level. Renter has been given an opportunity to examine Vehicle in advance of taking possession of it, and upon such inspection, is not aware of any damage existing on the vehicle other than that which is pointed out by Host Representatives and pictured in photos. We encourage Renter to take their own photos. Renter agrees to cover the full cost to repair damage incurred to Vehicle during Rental Period. This includes: Cosmetic damage (e.g., scratches, tears, scuffs, dents of any size, etc.) to the exterior and/or interior of Vehicle which was not present prior to Rental Period. This also includes mechanical damage to Vehicle (e.g., frame, drivetrain, suspension, etc.) which was not present prior to Rental Period and which was not the result of a mechanical failure of Vehicle under normal use conditions and/or which is not a standard wear/maintenance item, as determined by the manufacturer of Vehicle. Renter must only use premium gasoline with a minimum octane rating of 91 in Vehicle. Please place fuel receipts in center console. Renter will be solely liable for any and all damages and costs related to repairing the damage caused by refueling with the wrong grade or type of gas into Vehicle.

Cleaning excessive exterior and interior dirt trash ashes etc: $200`,
  },
  {
    title: 'DAMAGE CHARGES',
    body: `Rim Curb rash per wheel: $200 Smoking Damage fee: $175 Impound Recovery fee: $1,000 Towing fee: $1,000 Tire tread measurements will be taken prior to rental. Burnout fee: $1,200 for tire replacements, Renter is responsible for cost of tire replacement if flat occurs during rental. Loss of Use charges apply if Renter is found at fault in accident: Vehicle Daily Rate x number of days the vehicle is out of service for repairs. Vehicle tracker monitors vehicle excessive speed and notifies Host: over 100 mph 3 times results in $500 penalty. No burnouts or launches. No illegal substances/objects in Vehicle or acts. Acts based on criminal codes/statutes will be reported to law enforcement and rental will be terminated without refund. No commercial for profit use including but not limited to Door Dash, Uber, Lyft, Uber eats or the like.`,
  },
  {
    title: 'PROHIBITED USES',
    body: `Vehicle may not be used: By anyone not licensed to drive or whose Driver's License has been suspended or restricted; for any illegal purpose or in connection with any illegal activity; to carry persons or property for hire; to push or tow anything; to exceed any posted speed limits; in any speed test, speed contest, race, rally, speed endurance contest, demonstration; or on or near any raceway or road course. In the event of a violation of these Prohibited Uses, Host reserves the right to end your rental and retrieve the vehicle. There will be no refunds..`,
  },
  {
    title: 'INSURANCE',
    body: `The Renter hereby warrants to the Vehicle Registered Owner and/or Host, that Renter possess car insurance that covers personal injury to Renter or other persons as well as the Vehicle and the property of others including theft. Rad Rides LLC is self-insured and the policy above is the primary insurance for this trip. Indemnity Regardless of insurance coverage: Renter shall fully indemnify the Owner for any loss, damage, and legal actions, including reasonable attorneys fees that Rad Rides LLC suffers due to Renter's use of Vehicle during the term of this Agreement, including but not limited to, damage to the Vehicle, damage to the property of others, injury to Renter, and injury to others. This provision survives the termination of this Agreement. The Renter agrees that, in the event that damages are incurred to Vehicle during Rental Period, Renter is financially responsible to pay for the repair and/or replacement of Vehicle, up to and including the full market-value Vehicle replacement cost through their personal auto insurance policy or other means in accordance with the Vehicle Damage clause. The Renter confirms that they have sufficient insurance coverage and/or financial means beyond their personal auto insurance coverage to cover all costs related to damage to property, injury and/or bodily harm to Renter, and/or injury and/or bodily harm to others related to use of Vehicle during Rental Period. If the Rental Vehicle is damaged or destroyed while it is in the possession of Renter, Renter agrees to pay any required insurance deductible and also takes full responsibility for all damages as well as relinquishes all rights to collect insurance proceeds to Chad Norris/Rad Rides LLC. Renter and Renter's insurance will be liable for loss of use and diminished value in which if the Vehicle is rendered inoperable due to events that occur during the Renter's rental term, the Renter must cover the costs, damages, and loss of income to Rad Rides LLC due to the vehicle being inoperable.`,
  },
  {
    title: 'ZERO LIABILITY CLAUSE',
    body: `Host, in good faith has ensured that The Vehicle is safe to drive and has been well maintained according to manufacturer guidelines. Per the Graves Amendment (49 U.S.C. § 30106), The Host assumes zero liability related to The Vehicle or use thereof during Rental Period. The Host assumes zero liability for the actions of The Renter during The Rental Period. The Renter agrees to assume full responsibility and liability for all damage to Vehicle, property, injury and/or bodily harm to The Renter, and/or injury and/or bodily harm to others during Rental Period.`,
  },
  {
    title: 'TRACKING',
    body: `Please note that this vehicle is equipped with GPS tracking for your safety. If the device is removed, we will attempt to contact the Renter. If we are not able to get in touch with the Renter, the vehicle will be reported to law enforcement as stolen. All deposits will be forfeited. Tracking equipment is used only for your safety and to uphold the law and will not be reviewed without proper and justifiable reason.`,
  },
  {
    title: 'OWNER WARRANTY',
    body: `Owner/Host RAD RIDES LLC represents that to the best of their knowledge and belief that the Vehicle is in sound and safe condition. To the best of their knowledge there are no known faults or defects that would affect its safe operation under normal use.`,
  },
  {
    title: 'CITATIONS AND TOLLS',
    body: `The Renter accepts full responsibility and liability for any and all citations and/or moving violations incurred during Rental Period (speeding, excessive noise, exhibition of speed, etc.). If any citation(s) result(s) in costs to The Vehicle or The Host, The Renter agrees to pay a $100 Citation Service Fee in addition to any and all costs associated with the citation. This may include, but is not limited to, unpaid parking violations, car impounding fees, etc. The Renter agrees to pay for any and all Tolls incurred during The Rental Period, including any Toll fees and/or notices received by vehicle registered owner or RAD RIDES LLC after Rental Period which were incurred during The Rental Period. The Renter agrees to pay a Toll Service Fee of $50 in addition to the toll fare for any toll charges received by The Host after The Rental Period.`,
  },
  {
    title: 'ARBITRATION',
    body: `In the event that the Parties cannot amicably resolve a dispute or damage claim resulting from this Agreement, the Parties agree to resolve such dispute or damage claim by arbitration. This Car Rental Agreement will be interpreted by the laws of the State of California, and any lawsuit or arbitration must be brought in LA County, the city of Calabasas of the State of California. If any portion of this agreement is found to be unenforceable by a court of competent jurisdiction, the remainder of the agreement would still have full force and effect. If litigation is initiated, losing party pays prevailing party attorney and court fees.`,
  },
  {
    title: 'GENERAL',
    body: `This Agreement, including all Exhibit(s), constitutes the entire agreement between the Parties in connection with the subject matter hereof and supersedes all agreements, proposals, representations and other understandings, oral or written, of the Parties and any current or subsequent purchase order(s) provided.

No alteration or modification of this Agreement or any Exhibits shall be valid unless made in writing and signed by an authorized Affiliate of each Party. The waiver by either Party or a breach or any provision of the Agreement shall not operate or be construed as a waiver of any subsequent breach and any waiver must be in writing and signed by an authorized Affiliate of the Parties hereto. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue to be in effect and any note or other communication required or permitted hereunder shall be given In writing to the other Party at the address stated all or at such other address as shall be given of either Party to the other in writing. Any terms of this Agreement which by their nature extend beyond its termination remain in effect until fulfilled and apply to respective successors and rightful assignees.

The Renter acknowledges The Host's right to collect any and all fees due after The Rental Period, per this Agreement, and permits The Host to charge the payment method on file for any and all due fees in one or more transactions, as required. Should the payment method on file be declined, The Renter agrees to provide an alternate payment method within 48 hours of receiving notice from The Host of the declined payment method. The Host reserves the right to refuse rental of The Vehicle to a Renter for any reason. If any of the terms of this Agreement are deemed invalid or unenforceable by a court of law, the validity and enforceability of the remaining terms of this Agreement will not in any way be affected or impaired thereby.

This Agreement shall be binding upon and inure to the benefit of the Parties, and each of them, and their respective heirs, executors, administrators, assigns, successors-in-interest, predecessors-in-interest and anyone claiming by, through or under any one of them.

This Agreement is personal and cannot be assigned to any other person or entity. This Agreement constitutes a single, integrated contract expressing the entire Agreement of the parties concerning the subject matter referred to in this Agreement. No covenants, agreements, representations, or warranties of any kind whatsoever, whether expressed or implied in law or fact, have been made by any party to this Agreement, except as specifically set forth in this Agreement. This Agreement supersedes and replaces all prior or contemporaneous discussions, negotiations or agreements, written or oral, except as set forth herein.

This Agreement may not be amended, altered or modified except in a writing signed by each of the Parties of this Agreement. Each of the Parties hereby represents and warrants to the other Parties that no other person or entity having any interest in any claim that is or may be the subject of this Agreement or the claims stated in the Recitals herein.

Each of the Parties further represents and warrants that no claim presented in the Recitals has been assigned, transferred, subrogated or purported to have assigned, transferred or subrogated any of the rights or claims released herein to any other person or entity. The parties represent and warrant that they are the sole holders of any rights to enter into and sign this Agreement.`,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 font-inter">
          Terms of Service
        </h1>
        <div className="w-24 h-1 bg-blue-500 mb-16"></div>

        <div className="space-y-12 text-gray-700 text-lg leading-relaxed">
          <section>
            <p className="mb-6">
              By renting a vehicle from Rad Rides LLC, you agree to the following terms and conditions in their entirety.
            </p>
          </section>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-l-4 border-blue-500 pl-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-base leading-7 text-gray-700">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
