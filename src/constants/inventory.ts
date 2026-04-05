export interface Product {
  id: string;
  model?: string;
  name?: string;
  price: string;
  img?: string;
  category: string;
  condition: 'new' | 'used';
  warranty?: string;
  specs?: any;
  outOfStock?: boolean;
  icon?: string;
  chip?: string;
}

export const usedProcessors = {
  'Intel Core i3 Series': [
    { id: 'u-i3-3220', model: 'i3 3rd Gen (3220)', price: '1,700', img: 'https://lh3.googleusercontent.com/d/1x74hEtyTASVKrZLy5qn0vEPPBq0ndt6f', category: 'Processors', condition: 'used' },
    { id: 'u-i3-4150', model: 'i3 4th Gen (4150)', price: '1,850', img: 'https://lh3.googleusercontent.com/d/1GM9p0a5F85CWpuVY75GzdFYcM2R6xwlO', category: 'Processors', condition: 'used' },
    { id: 'u-i3-6100', model: 'i3 6th Gen (6100)', price: '3,500', img: 'https://lh3.googleusercontent.com/d/1RBXokaSPRNJVYKZRnMGjBZi025-zhP_G', category: 'Processors', condition: 'used' },
    { id: 'u-i3-7100', model: 'i3 7th Gen (7100)', price: '4,500', img: 'https://lh3.googleusercontent.com/d/1Enj3pbhPl2TGaz3VBQLrFjdVIHBqxUVd', category: 'Processors', condition: 'used' },
    { id: 'u-i3-8100', model: 'i3 8th Gen (8100)', price: '7,900', img: 'https://lh3.googleusercontent.com/d/1jOGvcojCIdYU_VQG_Mlw2niUjzCAdoat', category: 'Processors', condition: 'used' },
    { id: 'u-i3-9100', model: 'i3 9th Gen (9100)', price: '9,500', img: 'https://lh3.googleusercontent.com/d/1NoeYXaCQoLNo--YKH_zheh5spGS0nJn1', category: 'Processors', condition: 'used' },
    { id: 'u-i3-10100', model: 'i3 10th Gen (10100)', price: '23,500', img: 'https://lh3.googleusercontent.com/d/1XRUW810yL23IP5DhfmRpm_AoAaXc5zmB', category: 'Processors', condition: 'used' },
  ],
  'Intel Core i5 Series': [
    { id: 'u-i5-2100', model: 'i5 2nd Gen (2100)', price: '3,650', img: 'https://lh3.googleusercontent.com/d/1EAy7sEoeRtmFxNn4yTo23URkd4zNEVnd', category: 'Processors', condition: 'used' },
    { id: 'u-i5-3470', model: 'i5 3rd Gen (3470)', price: '4,950', img: 'https://lh3.googleusercontent.com/d/16I8Hx9wppbPqjI_a_r2IrIdxcHfREMoy', category: 'Processors', condition: 'used' },
    { id: 'u-i5-4430', model: 'i5 4th Gen (4430)', price: '6,950', img: 'https://lh3.googleusercontent.com/d/1a5GRUyxirk9R9tcMB8YSl9n5FhuEs6Zd', category: 'Processors', condition: 'used' },
    { id: 'u-i5-4590', model: 'i5 4th Gen (4590)', price: '6,950', img: 'https://lh3.googleusercontent.com/d/1Kmm4bb0-mJIyS47WmNkzzxzXNrGap31m', category: 'Processors', condition: 'used' },
    { id: 'u-i5-4670', model: 'i5 4th Gen (4670)', price: '7,250', img: 'https://lh3.googleusercontent.com/d/1meTw4EeFEsssqw3mq-mdzeCrbrnrjnuR', category: 'Processors', condition: 'used' },
    { id: 'u-i5-6500', model: 'i5 6th Gen (6500)', price: '10,000', img: 'https://lh3.googleusercontent.com/d/1V48vHrmW2vvswIqUMPEck3a0s6_Ig0DP', category: 'Processors', condition: 'used' },
    { id: 'u-i5-7500', model: 'i5 7th Gen (7500)', price: '11,750', img: 'https://lh3.googleusercontent.com/d/1vdV0DlXH2PUyOJ1-8m-A_MCSO1VF_RlL', category: 'Processors', condition: 'used' },
    { id: 'u-i5-8500', model: 'i5 8500', price: '20,000', img: 'https://lh3.googleusercontent.com/d/1qrV5Zn9emQ6wsWPiIkkObTa_5l7OcTu6', category: 'Processors', condition: 'used' },
    { id: 'u-i5-9500', model: 'i5 9500', price: '23,500', img: 'https://lh3.googleusercontent.com/d/1UtKccKpzSfH6zEhWgJ6Jpijp-ALmkQ-r', category: 'Processors', condition: 'used' },
    { id: 'u-i5-10500', model: 'i5 10500', price: '34,500', img: 'https://lh3.googleusercontent.com/d/1RPnTzMcCAZe3zST2PUi1PajMRUUH3GRo', category: 'Processors', condition: 'used' },
  ],
  'Intel Core i7 & i9 Series': [
    { id: 'u-i7-2600', model: 'i7 2nd Gen (2600)', price: '9,000', img: 'https://lh3.googleusercontent.com/d/1dWOL48DNPjs9cia-3k6HrFcVIw5BtEcx', category: 'Processors', condition: 'used' },
    { id: 'u-i7-3770', model: 'i7 3rd Gen (3770)', price: '10,000', img: 'https://lh3.googleusercontent.com/d/1mFiJeXa7TpxaqTPt9cyLWnXCnMOclXJX', category: 'Processors', condition: 'used' },
    { id: 'u-i7-4790', model: 'i7 4th Gen (4790)', price: '13,500', img: 'https://lh3.googleusercontent.com/d/16iC8SvEXP-8MeO57djd9rHUx-2KiUIiL', category: 'Processors', condition: 'used' },
    { id: 'u-i7-4790k', model: 'i7 4th Gen (4790K)', price: '13,750', img: 'https://lh3.googleusercontent.com/d/1VWKPdakCqk0txfXnumXXuobH2cjvdQ5q', category: 'Processors', condition: 'used' },
    { id: 'u-i7-6700', model: 'i7 6th Gen (6700)', price: '18,900', img: 'https://lh3.googleusercontent.com/d/1uNjvBdpXkEdnyRtOLEfWbqKzvNBM_xRK', category: 'Processors', condition: 'used' },
    { id: 'u-i7-6700k', model: 'i7 6th Gen (6700K)', price: '19,500', img: 'https://lh3.googleusercontent.com/d/1Yy-tEe441BMhfnQkHlA6736DP7M9yWXc', category: 'Processors', condition: 'used' },
    { id: 'u-i7-7700', model: 'i7 7th Gen (7700)', price: '19,000', img: 'https://lh3.googleusercontent.com/d/1CDNzfuKUx5C5S2HEHJSIxzVReqn7IkTd', category: 'Processors', condition: 'used' },
    { id: 'u-i7-8700', model: 'i7 8700', price: '36,000', img: 'https://lh3.googleusercontent.com/d/1F-MkKKn4QnlPYWpUqlnEs4skbdPaQSQi', category: 'Processors', condition: 'used' },
    { id: 'u-i7-9700', model: 'i7 9700', price: '41,000', img: 'https://lh3.googleusercontent.com/d/136tcQhzmor0_DVwLfe1z5ooTawB12cUG', category: 'Processors', condition: 'used' },
    { id: 'u-i7-10700', model: 'i7 10700', price: '65,000', img: 'https://lh3.googleusercontent.com/d/1MAKoMWK3_Qjg41lDO1FO_BL_HbwIDpea', category: 'Processors', condition: 'used', specs: { cores: '8', threads: '16', base: '2.9 GHz', boost: '4.8 GHz', cache: '16MB Intel Smart Cache', tdp: '65W', socket: 'LGA 1200' } },
    { id: 'u-i9-9900k', model: 'i9 9th Gen (9900K)', price: '55,500', img: 'https://lh3.googleusercontent.com/d/1pDlHf7tRzezwBKgW-PSo4DCJ4cz-TGHL', category: 'Processors', condition: 'used', specs: { cores: '8', threads: '16', base: '3.6 GHz', boost: '5.0 GHz', cache: '16MB Intel Smart Cache', tdp: '95W', socket: 'LGA 1151' } },
  ]
};

export const ryzenBrandNew = {
  'RYZEN 3 SERIES': [
    { id: 'n-r3-3200g', model: 'Ryzen 3 3200G', price: '22,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/10Ov_6opRp0CdUnUn1lqxNwXL2FxU76Cn', category: 'Processors', condition: 'new' },
  ],
  'RYZEN 5 SERIES': [
    { id: 'n-r5-3400g', model: 'Ryzen 5 3400G', price: '27,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/148RerzjqgJtXlsTx7gJVSCwhhOFZtD4D', category: 'Processors', condition: 'new' },
    { id: 'n-r5-4600g', model: 'Ryzen 5 4600G', price: '35,500', warranty: '01 Year Warranty', img: 'https://lh3.googleusercontent.com/d/1-rSzsdS3sv7LOH-mWGqfscwvXqts0rzT', category: 'Processors', condition: 'new' },
    { id: 'n-r5-5500x-3d', model: 'Ryzen 5 5500X 3D', price: '61,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/13LK5Fg2HLBAZBUIESK3EJnK1nYD__xul', category: 'Processors', condition: 'new' },
    { id: 'n-r5-5600x', model: 'Ryzen 5 5600X', price: '43,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1-k1iFR9arEBGqXCxsUD-A0wK1z1DM743', category: 'Processors', condition: 'new' },
    { id: 'n-r5-7500f', model: 'Ryzen 5 7500F', price: '44,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1xgqDP_2zmRNhFF93zdzCgffBU4gYXOi-', category: 'Processors', condition: 'new' },
    { id: 'n-r5-7600x', model: 'Ryzen 5 7600X', price: '61,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1C_h76OQIqrL-zKMxc-Hpbi-VonIYGVGj', category: 'Processors', condition: 'new' },
    { id: 'n-r5-8400f', model: 'Ryzen 5 8400F', price: '42,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1b0t_ERLlabl-IBKv6lW_1DTqgZNv66Qs', category: 'Processors', condition: 'new' },
    { id: 'n-r5-8500g', model: 'Ryzen 5 8500G', price: '53,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/14KUAJC0rttl67VKOMbR5rKUwfPt_mrfD', category: 'Processors', condition: 'new' },
    { id: 'n-r5-8600g', model: 'Ryzen 5 8600G', price: '63,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1EjSsf-7dUkcrwD8565JtA9oOC5a54yef', category: 'Processors', condition: 'new' },
    { id: 'n-r5-9600x', model: 'Ryzen 5 9600X', price: '65,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1GYhhz7GNfMzA8uB07507_QKNPjbv-xBH', category: 'Processors', condition: 'new' },
  ],
  'RYZEN 7 SERIES': [
    { id: 'n-r7-5700g', model: 'Ryzen 7 5700G', price: '60,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1KvLsdDaA4ygzZE2ttxsROCrt9j4Um8WU', category: 'Processors', condition: 'new' },
    { id: 'n-r7-7700', model: 'Ryzen 7 7700', price: '70,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1-Gdunz9JdJIN8GZvkBZvBJon9FQZhEOj', category: 'Processors', condition: 'new' },
    { id: 'n-r7-7800x-3d', model: 'Ryzen 7 7800X 3D', price: '104,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1Dy9JndGgql0aA_H-huPSmKGtuca6CLHP', category: 'Processors', condition: 'new' },
    { id: 'n-r7-8700f', model: 'Ryzen 7 8700F', price: '54,250', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1ISEcaWfQDPpDf1eC-OEL0SQM_PfK4_Rp', category: 'Processors', condition: 'new' },
    { id: 'n-r7-8700g', model: 'Ryzen 7 8700G', price: '90,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1avh1ulmUYjXp5qjdT4nacy6_tuW5jCHz', category: 'Processors', condition: 'new' },
    { id: 'n-r7-9700x', model: 'Ryzen 7 9700X', price: '85,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1XlWRkZ-fMs4bWdpxkJc3O9ZFz08FARSD', category: 'Processors', condition: 'new' },
    { id: 'n-r7-9800x-3d', model: 'Ryzen 7 9800X 3D', price: '151,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1JQ41MgLLd6KszNWeWzxrXffdhp47A9MU', category: 'Processors', condition: 'new' },
  ],
  'RYZEN 9 SERIES': [
    { id: 'n-r9-9900x', model: 'Ryzen 9 9900X', price: '133,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1gI_z51GtSeH-1d8dD5nEDu2dzVuFktr6', category: 'Processors', condition: 'new' },
    { id: 'n-r9-9900x-3d', model: 'Ryzen 9 9900X 3D', price: '177,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1rc9e4upnw7oKQR7lwU_bKN65HCsuX5GH', category: 'Processors', condition: 'new' },
    { id: 'n-r9-9950x-3d', model: 'Ryzen 9 9950X 3D', price: '224,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/15IthoSxvTLRzPxKfHPyOeKz6U6Y2EnDG', category: 'Processors', condition: 'new' },
  ]
};

export const intelBrandNew = {
  'BRAND NEW INTEL PROCESSORS': [
    { id: 'n-i3-12100', model: 'Intel Core i3-12100 (12th Gen)', price: '43,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1M3q6tTlUtegwP7v62W7zeGADNYyM2yWw', category: 'Processors', condition: 'new', specs: { cores: '4', threads: '8', base: '3.3 GHz', boost: '4.3 GHz', socket: 'LGA 1700' } },
    { id: 'n-i3-12100f', model: 'Intel Core i3-12100F (12th Gen)', price: '29,750', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1sXTVR1IKUp4hDXFJHVwzhbEDjjDunir7', category: 'Processors', condition: 'new', specs: { cores: '4', threads: '8', base: '3.3 GHz', boost: '4.3 GHz', socket: 'LGA 1700' } },
    { id: 'n-i3-14100', model: 'Intel Core i3-14100 (14th Gen)', price: '48,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1DB81uuZiKO5E9kqpd8jhN7eCOICWVOmS', category: 'Processors', condition: 'new', specs: { cores: '4', threads: '8', base: '3.5 GHz', boost: '4.7 GHz', socket: 'LGA 1700' } },
  ],
  'Intel Core i5 Series': [
    { id: 'n-i5-12400', model: 'Core i5 12400', price: '61,000', outOfStock: true, category: 'Processors', condition: 'new' },
    { id: 'n-i5-12400f', model: 'Core i5 12400F', price: '46,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/112fy-Jcc2PKHaqEjz-bB1w2v1rcR-Vm_', category: 'Processors', condition: 'new', specs: { cores: '6', threads: '12', base: '2.5 GHz', boost: '4.4 GHz', socket: 'LGA 1700' } },
    { id: 'n-i5-13400f', model: 'Core i5 13400F', price: '54,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1SbCczyxqihIal8sEwL_0H34lR9WdiySl', category: 'Processors', condition: 'new', specs: { cores: '10 (6P+4E)', threads: '16', base: '2.5 GHz', boost: '4.6 GHz', socket: 'LGA 1700' } },
    { id: 'n-i5-14400', model: 'Core i5 14400', price: '79,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1fjjcQZMRahi22xXCJXJjnc6sQzgHH_WB', category: 'Processors', condition: 'new', specs: { cores: '10 (6P+4E)', threads: '16', base: '2.5 GHz', boost: '4.7 GHz', socket: 'LGA 1700' } },
    { id: 'n-i5-14400f', model: 'Core i5 14400F', price: '57,000', outOfStock: true, category: 'Processors', condition: 'new' },
    { id: 'n-i5-14600k', model: 'Core i5 14600K', price: '81,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1cNtf1-WUNLFYa0XKQG7Kc-plWtHXB0v1', category: 'Processors', condition: 'new', specs: { cores: '14 (6P+8E)', threads: '20', base: '3.5 GHz', boost: '5.3 GHz', socket: 'LGA 1700' } },
  ],
  'Intel Core i7 Series': [
    { id: 'n-i7-12700', model: 'Core i7 12700', price: '98,000', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/18LuvlXqDQh6BQhNLTGAdmr8767p2FgvN', category: 'Processors', condition: 'new', specs: { cores: '12 (8P+4E)', threads: '20', base: '2.1 GHz', boost: '4.9 GHz', socket: 'LGA 1700' } },
    { id: 'n-i7-12700k', model: 'Core i7 12700K', price: '90,000', outOfStock: true, category: 'Processors', condition: 'new' },
    { id: 'n-i7-14700', model: 'Core i7 14700', price: '136,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1N80yA97WeqOtdubdLqm7izDJY4RnMs9N', category: 'Processors', condition: 'new', specs: { cores: '20 (8P+12E)', threads: '28', base: '2.1 GHz', boost: '5.4 GHz', socket: 'LGA 1700' } },
    { id: 'n-i7-14700k', model: 'Core i7 14700K', price: '138,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1DdqK6RP6w_PONtBZQYCIlisRVP-1G44s', category: 'Processors', condition: 'new', specs: { cores: '20 (8P+12E)', threads: '28', base: '3.4 GHz', boost: '5.6 GHz', socket: 'LGA 1700' } },
    { id: 'n-i7-14700f', model: 'Core i7 14700F', price: '102,000', outOfStock: true, category: 'Processors', condition: 'new' },
  ],
  'Intel Core i9 Series': [
    { id: 'n-i9-13900k', model: 'Core i9 13900K', price: '155,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1Ai9kxsQTEPcq5Suy4CN_dol-HtzUfMh0', category: 'Processors', condition: 'new', specs: { cores: '24 (8P+16E)', threads: '32', base: '3.0 GHz', boost: '5.8 GHz', socket: 'LGA 1700' } },
    { id: 'n-i9-14900k', model: 'Core i9 14900K', price: '172,500', warranty: '03 Years Warranty', img: 'https://lh3.googleusercontent.com/d/1yUYhn4HMa85E590vTyyqYpMl3rvYXJ2w', category: 'Processors', condition: 'new', specs: { cores: '24 (8P+16E)', threads: '32', base: '3.2 GHz', boost: '6.0 GHz', socket: 'LGA 1700' } },
  ]
};

export const usedRAM = {
  'DDR3 Series': [
    { id: 'u-ram-4gb-d3', model: '4GB DDR3', price: '2,500', category: 'RAM', condition: 'used' },
    { id: 'u-ram-8gb-d3', model: '8GB DDR3', price: '5,850', category: 'RAM', condition: 'used' },
    { id: 'u-ram-8gb-d3-hs', model: '8GB DDR3 Heat Sink', price: '5,900', category: 'RAM', condition: 'used' },
  ],
  'DDR4 Series': [
    { id: 'u-ram-4gb-d4', model: '4GB DDR4', price: '6,900', category: 'RAM', condition: 'used' },
    { id: 'u-ram-8gb-d4', model: '8GB DDR4', price: '13,900', category: 'RAM', condition: 'used', specs: { type: 'DDR4', capacity: '8GB', speed: '2666 MHz', formFactor: 'DIMM' } },
    { id: 'u-ram-8gb-d4-hs', model: '8GB DDR4 Heat Sink', price: '14,900', category: 'RAM', condition: 'used' },
    { id: 'u-ram-16gb-d4', model: '16GB DDR4', price: '29,500', category: 'RAM', condition: 'used' },
    { id: 'u-ram-16gb-d4-hs', model: '16GB DDR4 Heat Sink', price: '31,000', category: 'RAM', condition: 'used' },
  ]
};

export const usedStorage = {
  'SSD': [
    { id: 'u-ssd-128', model: '128GB SSD (Branded)', price: '5,900', icon: 'hard_drive', category: 'Storage', condition: 'used' },
    { id: 'u-ssd-256', model: '256GB SSD', price: '10,900', icon: 'hard_drive', category: 'Storage', condition: 'used' },
  ],
  'M.2 (SATA)': [
    { id: 'u-m2-128', model: '128GB M.2', price: '5,550', icon: 'memory', category: 'Storage', condition: 'used' },
    { id: 'u-m2-256', model: '256GB M.2', price: '8,900', icon: 'memory', category: 'Storage', condition: 'used' },
    { id: 'u-m2-512', model: '512GB M.2', price: '15,900', icon: 'memory', category: 'Storage', condition: 'used' },
    { id: 'u-m2-1tb', model: '1TB M.2', price: '21,000', icon: 'memory', category: 'Storage', condition: 'used' },
  ],
  'NVMe': [
    { id: 'u-nvme-128', model: '128GB NVMe', price: '6,650', icon: 'memory_alt', category: 'Storage', condition: 'used' },
    { id: 'u-nvme-256', model: '256GB NVMe', price: '11,500', icon: 'memory_alt', category: 'Storage', condition: 'used' },
    { id: 'u-nvme-512', model: '512GB NVMe', price: '18,000', icon: 'memory_alt', category: 'Storage', condition: 'used' },
  ]
};

export const motherboardInventory = {
  'H-Series (Budget Boards)': [
    { id: 'm-h510', name: 'H510', price: '16,900.00', img: 'https://drive.google.com/thumbnail?id=15iRliIy1Kt0sn53cy96flDbvxABZQpMg&sz=w800', chip: 'LGA 1200', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1200', support: '10th/11th Gen Support', pcie: 'PCIe 4.0' } },
    { id: 'm-h410', name: 'H410', price: '15,800.00', img: 'https://drive.google.com/thumbnail?id=19uKYtB6NVBjTAxGsgPgAh2LHaX5_f6Ll&sz=w800', chip: 'LGA 1200', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1200', support: '10th Gen Support' } },
    { id: 'm-h310', name: 'H310', price: '12,500.00', img: 'https://drive.google.com/thumbnail?id=1dBkbWN0dfQxadZINBlQTBexhNNV3znCN&sz=w800', chip: 'LGA 1151v2', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151v2', support: '8th/9th Gen Support' } },
    { id: 'm-h110', name: 'H110', price: '7,500.00', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151', support: '6th/7th Gen Support' } },
    { id: 'm-h110-m2', name: 'H110 M.2', price: '8,500.00', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151', slot: 'M.2 NVMe Support' } },
    { id: 'm-h81', name: 'H81', price: '5,500.00', img: 'https://drive.google.com/thumbnail?id=1j2oyxZhjZXPKr-xuqzFfbsOPjimyObii&sz=w800', chip: 'LGA 1150', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1150', support: '4th Gen Support' } },
    { id: 'm-h61', name: 'H61', price: '4,500.00', img: 'https://drive.google.com/thumbnail?id=1DlL88Ebe26RQIeZ27OJ0f-wItwlewtqd&sz=w800', chip: 'LGA 1155', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1155', support: '2nd/3rd Gen Support' } },
    { id: 'm-g41', name: 'G41', price: '3,500.00', img: 'https://drive.google.com/thumbnail?id=1DlL88Ebe26RQIeZ27OJ0f-wItwlewtqd&sz=w800', chip: 'LGA 775', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 775', ram: 'DDR3 Support' } },
    { id: 'm-g31', name: 'G31', price: '2,900.00', img: 'https://drive.google.com/thumbnail?id=1DlL88Ebe26RQIeZ27OJ0f-wItwlewtqd&sz=w800', chip: 'LGA 775', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 775', ram: 'DDR2 Support' } },
  ],
  'B-Series (Mainstream Performance)': [
    { id: 'm-b460', name: 'B460', price: '18,500.00', img: 'https://drive.google.com/thumbnail?id=15iRliIy1Kt0sn53cy96flDbvxABZQpMg&sz=w800', chip: 'LGA 1200', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1200', support: '10th Gen Support' } },
    { id: 'm-b360', name: 'B360', price: '16,900.00', img: 'https://drive.google.com/thumbnail?id=1dBkbWN0dfQxadZINBlQTBexhNNV3znCN&sz=w800', chip: 'LGA 1151v2', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151v2', support: '8th/9th Gen Support' } },
    { id: 'm-b250', name: 'B250', price: '12,500.00', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151', support: '6th/7th Gen Support' } },
    { id: 'm-b150', name: 'B150', price: '11,500.00', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151', support: '6th/7th Gen Support' } },
    { id: 'm-b85', name: 'B85', price: '6,500.00', img: 'https://drive.google.com/thumbnail?id=1j2oyxZhjZXPKr-xuqzFfbsOPjimyObii&sz=w800', chip: 'LGA 1150', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1150', support: '4th Gen Support' } },
    { id: 'm-b75', name: 'B75', price: '5,500.00', img: 'https://drive.google.com/thumbnail?id=1DlL88Ebe26RQIeZ27OJ0f-wItwlewtqd&sz=w800', chip: 'LGA 1155', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1155', support: '2nd/3rd Gen Support' } },
  ],
  'Z-Series (High-End Overclocking)': [
    { id: 'm-z390', name: 'Z390', price: '21,500.00', img: 'https://drive.google.com/thumbnail?id=1dBkbWN0dfQxadZINBlQTBexhNNV3znCN&sz=w800', chip: 'LGA 1151v2', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151v2', support: '8th/9th Gen Support' } },
    { id: 'm-z370', name: 'Z370', price: '18,900.00', img: 'https://drive.google.com/thumbnail?id=1dBkbWN0dfQxadZINBlQTBexhNNV3znCN&sz=w800', chip: 'LGA 1151v2', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151v2', support: '8th/9th Gen Support' } },
    { id: 'm-z270', name: 'Z270', price: '15,500.00', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151', support: '6th/7th Gen Support' } },
    { id: 'm-z170', name: 'Z170', price: '14,500.00', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1151', support: '6th/7th Gen Support' } },
    { id: 'm-z97', name: 'Z97', price: '7,500.00', img: 'https://drive.google.com/thumbnail?id=1j2oyxZhjZXPKr-xuqzFfbsOPjimyObii&sz=w800', chip: 'LGA 1150', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1150', support: '4th Gen Support' } },
    { id: 'm-z87', name: 'Z87', price: '6,000.00', img: 'https://drive.google.com/thumbnail?id=1j2oyxZhjZXPKr-xuqzFfbsOPjimyObii&sz=w800', chip: 'LGA 1150', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1150', support: '4th Gen Support' } },
    { id: 'm-z77', name: 'Z77', price: '4,900.00', img: 'https://drive.google.com/thumbnail?id=1DlL88Ebe26RQIeZ27OJ0f-wItwlewtqd&sz=w800', chip: 'LGA 1155', category: 'Motherboards', condition: 'used', warranty: '03-Month Warranty', specs: { socket: 'LGA 1155', support: '2nd/3rd Gen Support' } },
  ]
};

export const vgaInventory = {
  'Used VGA': [
    { id: 'v-gt710', model: 'NVIDIA GT 710 2GB', price: '8,500', img: 'https://picsum.photos/seed/vga1/400/400', category: 'VGA', condition: 'used' },
    { id: 'v-gt1030', model: 'NVIDIA GT 1030 2GB', price: '18,500', img: 'https://picsum.photos/seed/vga2/400/400', category: 'VGA', condition: 'used' },
    { id: 'v-gtx1050ti', model: 'NVIDIA GTX 1050 Ti 4GB', price: '28,500', img: 'https://picsum.photos/seed/vga3/400/400', category: 'VGA', condition: 'used' },
    { id: 'v-gtx1650', model: 'NVIDIA GTX 1650 4GB', price: '38,500', img: 'https://picsum.photos/seed/vga4/400/400', category: 'VGA', condition: 'used' },
    { id: 'v-rtx3060', model: 'NVIDIA RTX 3060 12GB', price: '85,000', img: 'https://picsum.photos/seed/vga5/400/400', category: 'VGA', condition: 'used', specs: { vram: '12GB GDDR6', busWidth: '192-bit', cooling: 'Dual Fan', interface: 'PCIe 4.0' } },
  ],
  'Brand New VGA': [
    { id: 'n-rtx4060', model: 'NVIDIA RTX 4060 8GB', price: '115,000', warranty: '03 Years Warranty', img: 'https://picsum.photos/seed/vga6/400/400', category: 'VGA', condition: 'new' },
    { id: 'n-rtx4070', model: 'NVIDIA RTX 4070 12GB', price: '185,000', warranty: '03 Years Warranty', img: 'https://picsum.photos/seed/vga7/400/400', category: 'VGA', condition: 'new' },
  ]
};

export const accessoryData: Record<string, Record<string, any[]>> = {
  keyboards: {
    gaming: [
      { id: 'acc-kb-1', model: 'Razer BlackWidow V4 Pro', price: '45,500', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
      { id: 'acc-kb-2', model: 'Logitech G Pro X TKL', price: '38,000', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
      { id: 'acc-kb-3', model: 'Corsair K70 RGB MK.2', price: '34,500', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
    ],
    standard: [
      { id: 'acc-kb-4', model: 'Logitech K120 Wired', price: '2,850', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
      { id: 'acc-kb-5', model: 'Dell KB216 Multimedia', price: '3,200', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
    ],
    wireless: [
      { id: 'acc-kb-6', model: 'Logitech MX Keys S', price: '32,500', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
      { id: 'acc-kb-7', model: 'Apple Magic Keyboard', price: '28,000', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', icon: 'keyboard', category: 'Keyboards', condition: 'new' },
    ]
  },
  mouse: {
    gaming: [
      { id: 'acc-m-1', model: 'Logitech G502 X Plus', price: '28,500', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop', icon: 'mouse', category: 'Mouse', condition: 'new' },
      { id: 'acc-m-2', model: 'Razer DeathAdder V3 Pro', price: '26,000', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop', icon: 'mouse', category: 'Mouse', condition: 'new' },
    ],
    standard: [
      { id: 'acc-m-3', model: 'Logitech M100 Wired', price: '1,850', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop', icon: 'mouse', category: 'Mouse', condition: 'new' },
    ],
    wireless: [
      { id: 'acc-m-4', model: 'Logitech MX Master 3S', price: '24,500', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop', icon: 'mouse', category: 'Mouse', condition: 'new' },
    ]
  },
  speakers: {
    standard: [
      { id: 'acc-sp-1', model: 'Logitech Z120 2.0', price: '3,500', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop', icon: 'speaker', category: 'Speakers', condition: 'new' },
    ],
    rgb: [
      { id: 'acc-sp-2', model: 'Logitech G560 RGB', price: '42,000', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop', icon: 'speaker', category: 'Speakers', condition: 'new' },
    ],
    subwoofers: [
      { id: 'acc-sp-3', model: 'Logitech Z623 2.1', price: '38,500', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop', icon: 'speaker', category: 'Speakers', condition: 'new' },
    ]
  },
  'laptop-accessories': {
    chargers: [
      { id: 'acc-la-1', model: 'HP 65W Blue Pin Adapter', price: '4,500', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop', icon: 'power', category: 'Laptop Accessories', condition: 'new' },
      { id: 'acc-la-2', model: 'Dell 65W Type-C Adapter', price: '6,800', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop', icon: 'power', category: 'Laptop Accessories', condition: 'new' },
    ],
    batteries: [
      { id: 'acc-la-3', model: 'HP Pavilion Battery', price: '8,500', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop', icon: 'battery_full', category: 'Laptop Accessories', condition: 'new' },
    ],
    displays: [
      { id: 'acc-la-4', model: '15.6" Slim LED 30-Pin', price: '18,500', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop', icon: 'monitor', category: 'Laptop Accessories', condition: 'new' },
    ]
  },
  'network-accessories': {
    routers: [
      { id: 'acc-na-1', model: 'TP-Link Archer AX55 Wi-Fi 6', price: '18,500', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop', icon: 'router', category: 'Network Accessories', condition: 'new' },
    ],
    switches: [
      { id: 'acc-na-2', model: 'TP-Link 8-Port Gigabit Switch', price: '4,200', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop', icon: 'settings_ethernet', category: 'Network Accessories', condition: 'new' },
    ],
    dongles: [
      { id: 'acc-na-3', model: 'TP-Link Archer T3U Plus', price: '3,850', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop', icon: 'usb', category: 'Network Accessories', condition: 'new' },
    ]
  },
  cables: {
    hdmi: [
      { id: 'acc-c-1', model: 'Vention 4K HDMI 2.0 (3m)', price: '1,850', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop', icon: 'settings_input_hdmi', category: 'Cables', condition: 'new' },
    ],
    vga: [
      { id: 'acc-c-2', model: 'Standard VGA Cable (1.5m)', price: '650', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop', icon: 'settings_input_component', category: 'Cables', condition: 'new' },
    ],
    power: [
      { id: 'acc-c-3', model: 'Desktop Power Cable', price: '450', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop', icon: 'power', category: 'Cables', condition: 'new' },
    ],
    sata: [
      { id: 'acc-c-4', model: 'SATA III Data Cable', price: '350', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop', icon: 'storage', category: 'Cables', condition: 'new' },
    ]
  },
  ups: {
    '650va': [
      { id: 'acc-ups-1', model: 'DCP 650VA UPS', price: '12,500', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop', icon: 'battery_1_bar', category: 'UPS', condition: 'new' },
    ],
    '1200va': [
      { id: 'acc-ups-2', model: 'DCP 1200VA UPS', price: '24,500', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop', icon: 'battery_5_bar', category: 'UPS', condition: 'new' },
    ],
    pro: [
      { id: 'acc-ups-3', model: 'APC Smart-UPS 2200VA', price: '145,000', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop', icon: 'battery_full', category: 'UPS', condition: 'new' },
    ]
  },
  'party-boxes': {
    standard: [
      { id: 'acc-pb-1', model: 'JBL PartyBox Encore', price: '85,000', img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=800&auto=format&fit=crop', icon: 'speaker', category: 'Party Boxes', condition: 'new' },
    ],
    'rgb-pro': [
      { id: 'acc-pb-2', model: 'JBL PartyBox 310', price: '165,000', img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=800&auto=format&fit=crop', icon: 'palette', category: 'Party Boxes', condition: 'new' },
    ],
    subwoofers: [
      { id: 'acc-pb-3', model: 'Sony MHC-V43D', price: '125,000', img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=800&auto=format&fit=crop', icon: 'surround_sound', category: 'Party Boxes', condition: 'new' },
    ]
  }
};

export const allProducts: Product[] = [
  ...Object.values(usedProcessors).flat(),
  ...Object.values(ryzenBrandNew).flat(),
  ...Object.values(intelBrandNew).flat(),
  ...Object.values(usedRAM).flat(),
  ...Object.values(usedStorage).flat(),
  ...Object.values(motherboardInventory).flat().map(item => ({ ...item, model: item.name })),
  ...Object.values(vgaInventory).flat(),
  ...Object.values(accessoryData).flatMap(cat => Object.values(cat).flat())
] as Product[];

export const searchProducts = (query: string): Product[] => {
  if (!query) return [];
  const keywords = query.toLowerCase().split(' ').filter(k => k.length > 0);
  
  return allProducts.filter(product => {
    const searchString = `${product.model || ''} ${product.name || ''} ${product.category} ${product.condition}`.toLowerCase();
    return keywords.every(keyword => searchString.includes(keyword));
  });
};
