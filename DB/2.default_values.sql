insert into statuses
(
	status,
	description
)
values
(
	'Active',
	'The customer has yet to be contacted.'
),
(
	'No Answer',
	'Agent dialed the number but no one answered before the timeout value elapsed.'
),
(
	'Busy',
	'Agent dialed the number and received a busy signal.'
),
(
	'Follow-up',
	'Customer requested a follow-up call.'
),
(
	'Failed',
	'Agent could not connect the call, most likely because the phone number was entered incorrectly.'
),
(
	'Completed',
	'Agent has completed the call process.'
),
;

begin;
INSERT INTO customers 
(
	business_name,
	nature_of_business,
	contact_person,
	email_address
) VALUES
(
	'Business One',
	'IT Solutions',
	'Person 1',
	'person_one@business_one.com'
)
;
insert into customers_status
(
	customers_id,
	status_id
)
values
(
	LAST_INSERT_ID(),
	1
);
commit;

# Test Account
begin;
insert into profile
(
	first_name,
	middle_name,
	last_name
)
values
(
	'Rafael',
	'Aurelio',
	'Pascual'
);
insert into accounts
(
	profile_id,
	username,
	password
)
values
(
	LAST_INSERT_ID(),
	'user1@gmail.com',
	md5('user123')
);
commit;


# contents
begin;
insert into contents (name, details, field_type) values('section1_1', 'YOUR ENGINE', 'text');
insert into contents (name, details, field_type) values('section1_2', 'FOR INNOVATION', 'text');

insert into contents (name, details, field_type) values('section2_title', 'SPACE', 'text');
insert into contents (name, details, field_type) values('section2_description', 'THE OFFICE IS MORE THAN JUST A PLACE TO WORK. THE WORKPLACE SHOULD INSPIRE EVERYTHING RELATED TO THE ENTREPRENEUR''S BUSINESS. IGNITION SPACE IS PARTICULARLY DESIGNED TO PROJECT AN IMAGE OF CONFIDENCE, SUCCESS AND A HIGH LEVEL OF COMPETENCE.', 'textarea');

insert into contents (name, details, field_type) values('section3_title', 'SERVICES', 'text');
insert into contents (name, details, field_type) values('section3_description', 'IGNITION SERVICES ARE TAILOR FIT FOR ENTREPRENEURS AND ALLOWS THEM TO SPEND MOST OF THEIR TIME, RESOURCES AND EFFORT ON THEIR CORE BUSINESS. IT ALSO REASSURES THEM OF QUALITY AND RELIABLE SERVICE AT A FRACTION OF THE COST OF BIG LAW OR ACCOUNTANCY FIRMS.', 'textarea');

insert into contents (name, details, field_type) values('section4_title', 'COMMUNITY', 'text');
insert into contents (name, details, field_type) values('section4_description', 'IGNITION IS COMMUNITY FILLED WITH LIKE-MINDED AND PRODUCTIVE ENTREPRENEURS AND PROFESSIONALS THAT COMPLIMENT EACH OTHER. THE ENVIRONMENT MAKES IT EASY FOR MEMBERS TO COOPERATE AND COORDINATE TO PURSUE BUSINESS PROJECTS.', 'textarea');
insert into contents (name, details, field_type) values('section4_button', 'IGNITE YOUR BUSINESS TODAY', 'text');

insert into contents (name, details, field_type) values('section5_title', 'IGNITION SPACE', 'text');
insert into contents (name, details, field_type) values('section5_description', 'CHOOSE YOUR WORKSPACE', 'text');
insert into contents (name, details, field_type) values('section5_accordion1', 'SMALL PRIVATE OFFICE FOR RENTAL', 'text');
insert into contents (name, details, field_type) values('section5_accordion1_description', 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue', 'text');
insert into contents (name, details, field_type) values('section5_accordion2', 'CO-WORKING SPACE [SEATS]', 'text');
insert into contents (name, details, field_type) values('section5_accordion2_description', 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue', 'text');
insert into contents (name, details, field_type) values('section5_accordion3', 'MEMBERSHIPS', 'text');
insert into contents (name, details, field_type) values('section5_accordion3_description', 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue', 'text');
insert into contents (name, details, field_type) values('section5_accordion4', 'EVENT SPACE', 'text');
insert into contents (name, details, field_type) values('section5_accordion4_description', 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue', 'text');
insert into contents (name, details, field_type) values('section5_accordion5', 'MEETING ROOMS', 'text');
insert into contents (name, details, field_type) values('section5_accordion5_description', 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue', 'text');
insert into contents (name, details, field_type) values('section5_accordion6', 'BUSINESS ADDRESS AND MAILING SERVICES', 'text');
insert into contents (name, details, field_type) values('section5_accordion6_description', 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue', 'text');
insert into contents (name, details, field_type) values('section5_button', 'PRICE STARTS AT P500 / DAY', 'text');

insert into contents (name, details, field_type) values('section7_title', 'IGNITION SERVICES', 'text');
insert into contents (name, details, field_type) values('section7_description', 'HELPING YOU WITH CONSECTETUR PURUS', 'text');

insert into contents (name, details, field_type) values('section7_hexagon1', 'BUSINESS REGISTRATION', 'text');
insert into contents (name, details, field_type) values('section7_hexagon2', 'INTELECTUAL PROPERTY', 'text');
insert into contents (name, details, field_type) values('section7_hexagon3', 'BASIC ACCOUNTING', 'text');
insert into contents (name, details, field_type) values('section7_hexagon4', 'HUMAN RESOURCES', 'text');
insert into contents (name, details, field_type) values('section7_hexagon5', 'IMMIGRATION SERVICES', 'text');
insert into contents (name, details, field_type) values('section7_hexagon6', 'REAL ESTATE', 'text');

insert into contents (name, details, field_type) values('section7_writeup', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book:</p>
							<ul>
								<li>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </li>
								<li>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
								<li>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</li>
							</ul>', 'wysihtml5');

insert into contents (name, details, field_type) values('section8_title1', 'DATABASE / TALENT POOL', 'text');
insert into contents (name, details, field_type) values('section8_description1', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title2', 'PEER MENTORSHIP PROGRAM', 'text');
insert into contents (name, details, field_type) values('section8_description2', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title3', 'MATCH MAKING FOR BUSINESS', 'text');
insert into contents (name, details, field_type) values('section8_description3', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title4', 'FEEDBACK MECHANISM', 'text');
insert into contents (name, details, field_type) values('section8_description4', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title5', 'EVENTS JUSTO VENENATIS', 'text');
insert into contents (name, details, field_type) values('section8_description5', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title6', 'CROWD SOURCE LOBBYING', 'text');
insert into contents (name, details, field_type) values('section8_description6', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title7', 'KNOWLEDGE SHARING', 'text');
insert into contents (name, details, field_type) values('section8_description7', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section8_title8', '...AND MORE LOREM LIGULA', 'text');
insert into contents (name, details, field_type) values('section8_description8', 'Vulpu ociis	natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu suere erat a ante venen.', 'textarea');

insert into contents (name, details, field_type) values('section9_title1', 'IGNITION CAPITAL', 'text');
insert into contents (name, details, field_type) values('section9_tag1_1', 'MALESUADA HELP', 'text');
insert into contents (name, details, field_type) values('section9_tag1_2', 'INDUSTRY VULPUTATE', 'text');
insert into contents (name, details, field_type) values('section9_description1', 'Ignition connects its community to industry experts, strategic partners and venture capitalists to assist disruptive innovators expand and grow their business.', 'text');

insert into contents (name, details, field_type) values('section9_title2', 'IGNITION STORIES', 'text');
insert into contents (name, details, field_type) values('section9_tag2', 'NULLAM QUIS RISUS EGET URNA MOLLIS', 'text');
insert into contents (name, details, field_type) values('section9_description2', 'Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo magna, vel scelerisque nisl.', 'text');

insert into contents (name, details, field_type) values('section10_tag', 'Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.', 'text');


/*
insert into contents (name, details, field_type) values('section7_title', '', 'text');
insert into contents (name, details, field_type) values('section7_description', '', 'text');
*/

