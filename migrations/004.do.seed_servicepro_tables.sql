BEGIN;

TRUNCATE
    servicepro_users,
    servicepro_services,
    servicepro_reviews
    RESTART IDENTITY CASCADE;

INSERT INTO servicepro_users( user_name, first_name, last_name, email, password, admin )
VALUES
    ('dunder', 'Dunder', 'Mifflin', 'dundermifflin@gmail.com', '$2y$12$fUEam31SC4TcI4FqXPXQPO3yxNo/MRwyz3AckckA3yl88/4vsPEA6', 'true'),
    ('mr_music', 'Alan', 'Menken', 'alanmenken@gmail.com', '$2y$12$r77Xk2ciZyAxgAu7.8BXeOhG4pce2pGyCLRmk.4yLatudodG4ALqC', 'false'),
    ('danger-zone', 'Johnny', 'Knoxville', 'johnnyknoxville@gmail.com', '$2y$12$/.XZ9g2jLid66XnE97jpcurbcxYgRZpPhyIPZixkV2y7ZwQA/ubga', 'false'),
    ('bettyboop', 'Betty', 'Boop', 'bettyboop@gmail.com', '$2y$12$iBf6UToH0Gxt.J13yrJYNuoWq02UA4zx1jRwwjYtWlJP9QVOJuPoS', 'false'),
    ('roids4days', 'Alex', 'Rodriguez', 'alexrodriguez@gmail.com', '$2y$12$FXLLo5ReWWbVtlLxW.BWluSPPdP8dm1Fz2HcxzXxULxpUyPgfkyHu', 'false'),
    ('crocodileHunter', 'Steve', 'Irwin', 'steveirwin@rip.com', '$2y$12$eImUH.840SXYNPEG9b4myuhRlaI.lzJ6.aL.cGuNXUpc06KqtA5um', 'false');

INSERT INTO servicepro_services( service_type, user_id, name, email, phone, city, state, about )
VALUES  
    ('mechanic', 1, 'Cars-R-Us', 'carsrus@cars.com', 4545159233, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('mechanic', 2, 'Vroom ''n Gloom', 'vroom@gmail.com', 5829940122, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('plumbing', 3, 'Sinkerator', 'sinksinksinks@sinks.com', 9492331223, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('plumbing', 4, 'Dirty Water Away', 'smellbegone@hotmail.com', 6642345912, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('remodling', 5, 'Better House', 'bh@bh.com', 8786452399, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('remodling', 6, 'Fixer Upper', 'rip-off@hgtv.com', 9094358867, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('lawnscaping', 1, 'Perfect Yards', 'greenfees@aol.com', 5657438767, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('lawnscaping', 2, 'We Lawnscape', 'lawnscaping@wedo.com', 4532209876, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('travel', 3, 'Fly Away', 'airplane@sky.com', 1234567890, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('travel', 4, 'Relax', 'getaway@gmail.com', 7674908090, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('hair', 5, 'Snip Snips', 'snipsnips@yahoo.com', 3356391435, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('hair', 6, 'Cutz ''n stuff', 'morestuffthancuts@me.com', 5054049009, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('jobs', 1, 'Work with Wealth', 'moneys@hotmail.com', 8782025654, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('jobs', 2, 'The Office', 'theoffice@abc.com', 5774933372, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('phone', 3, 'Fixit', 'wefixit@phone.com', 8576639825, 'austin', 'texas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.'),
    ('phone', 4, 'Broke No More', 'broken@sad.com', 2897451215, 'seattle', 'washington', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi lacus sed viverra tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci.');

INSERT INTO servicepro_reviews( rating, text, service_id, user_id )
VALUES 
    (5, 'This is an incredible mechanic! He took care of my car and did for less than expected. Two thumbs up!', 1, 1),
    (1, 'I hated my experience here. What a terrible shop!', 1, 4),
    (3, 'You know... it was alright', 1, 6),
    (5, 'Wow-ee Kazow-ee! What a fun place!', 1, 2),
    (2, 'Could''ve been way better but I guess my car is fixed. Thanks, I guess.', 1, 5);

COMMIT;