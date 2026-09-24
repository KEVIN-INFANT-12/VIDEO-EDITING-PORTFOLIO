-- Optional seed: the current portfolio videos, so the site looks identical
-- once it reads from the database. Run AFTER 0001_init.sql. Safe to skip.

insert into public.videos (title, category, video_url, display_order, is_featured, is_published) values
  ('Rhythm Cut',      'short_form', 'https://youtu.be/ziPVMccjoyw', 0,  true,  true),
  ('Momentum',        'short_form', 'https://youtu.be/YLFFs3KMC7k', 1,  true,  true),
  ('Pulse',           'short_form', 'https://youtu.be/M1ZIplANIHA', 2,  false, true),
  ('Snap',            'short_form', 'https://youtu.be/52s69frS52I', 3,  false, true),
  ('Flux',            'short_form', 'https://youtu.be/iWqRaYxmEo4', 4,  false, true),
  ('Signal',          'short_form', 'https://youtu.be/fhCaePXMJGs', 5,  false, true),
  ('Spark',           'short_form', 'https://youtu.be/tp04JoOj9t8', 6,  false, true),
  ('Loop',            'short_form', 'https://youtu.be/7LiJSueJM7Y', 7,  false, true),
  ('Drift',           'short_form', 'https://youtu.be/YpoCnKZyyxw', 8,  false, true),
  ('The Long Take',   'long_form',  'https://youtu.be/L-4wLdjHkEE', 9,  false, true),
  ('In Conversation', 'long_form',  'https://youtu.be/CAuVJrm7vhk', 10, false, true),
  ('Field Notes',     'long_form',  'https://youtu.be/UaeWjTwaA8U', 11, false, true),
  ('The Breakdown',   'long_form',  'https://youtu.be/OuTD1NVmqOI', 12, false, true),
  ('Deep Dive',       'long_form',  'https://youtu.be/xH4Fnk3W9H8', 13, false, true),
  ('Origins',         'long_form',  'https://youtu.be/MJ67F6TjwdE', 14, false, true),
  ('The Feature',     'long_form',  'https://youtu.be/iPG-lyl-jlY', 15, false, true),
  ('Sessions',        'long_form',  'https://youtu.be/p5fc1kC_oOU', 16, false, true);
