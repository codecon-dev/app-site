/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

type Props = { width?: number | string };

export default function PlatformLogo({ width = 20 }: Props) {
  return (
    <svg width={width} viewBox="0 0 77 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M69.571 16.6299C69.3556 16.6293 69.1451 16.5661 68.965 16.4479L59.305 10.1819C58.8928 9.91697 58.5533 9.5533 58.3172 9.1239C58.0811 8.6945 57.9559 8.21296 57.953 7.72295V2.06195C57.9561 1.72271 58.0506 1.39057 58.2265 1.10054C58.4025 0.810502 58.6535 0.573308 58.953 0.413948C59.2547 0.253456 59.5937 0.176182 59.9352 0.190066C60.2767 0.20395 60.6083 0.30849 60.896 0.492948L75.433 9.83795C75.9357 10.1636 76.3451 10.6143 76.621 11.1459C76.7477 11.3883 76.7787 11.6695 76.7077 11.9337C76.6368 12.1978 76.4691 12.4257 76.238 12.5719L70.151 16.4719C69.9752 16.5762 69.7744 16.6305 69.57 16.6289L69.571 16.6299ZM60.522 8.36195L69.571 14.2249L73.909 11.4459L60.169 2.62195V7.70695C60.1692 7.83596 60.2015 7.96289 60.2632 8.07622C60.3248 8.18955 60.4138 8.2857 60.522 8.35595V8.36195Z" fill="white"/>
      <path d="M59.86 30.884C59.3614 30.8862 58.8819 30.6923 58.525 30.3442C58.168 29.996 57.9623 29.5215 57.952 29.023V23.364C57.9555 22.8735 58.0814 22.3917 58.3184 21.9622C58.5554 21.5328 58.8959 21.1694 59.309 20.905L60.387 20.167C60.4558 20.1216 60.5292 20.0837 60.606 20.054L75.017 10.709C75.1471 10.625 75.2931 10.5689 75.446 10.5442C75.5989 10.5196 75.7552 10.527 75.905 10.566C76.054 10.6048 76.1932 10.6744 76.3137 10.7701C76.4342 10.8659 76.5335 10.9857 76.605 11.122C76.8598 11.606 76.9946 12.1441 76.998 12.691V18.273C76.999 18.8436 76.8578 19.4054 76.5872 19.9077C76.3166 20.41 75.9251 20.837 75.448 21.15L60.903 30.574C60.5918 30.775 60.2295 30.8826 59.859 30.884H59.86ZM61.391 22.134L60.521 22.7C60.4128 22.7702 60.3239 22.8664 60.2622 22.9797C60.2006 23.0931 60.1682 23.22 60.168 23.349V28.435L74.232 19.311C74.4061 19.1995 74.5493 19.046 74.6484 18.8645C74.7474 18.6831 74.7993 18.4797 74.799 18.273V13.487L61.615 22.04C61.5438 22.079 61.4687 22.1105 61.391 22.134Z" fill="white"/>
      <path d="M7.45402 16.6301C7.24128 16.6292 7.03317 16.5678 6.85402 16.4531L0.776019 12.5531C0.546171 12.4069 0.379381 12.18 0.308494 11.917C0.237607 11.654 0.267762 11.3739 0.393019 11.1321C0.669568 10.6062 1.07701 10.1605 1.57602 9.83806L16.121 0.493059C16.4097 0.307947 16.7425 0.2033 17.0852 0.189939C17.4278 0.176577 17.7678 0.254987 18.07 0.417059C18.3712 0.577305 18.6232 0.816221 18.7993 1.10837C18.9754 1.40051 19.0689 1.73495 19.07 2.07606V7.70706C19.0671 8.19707 18.9419 8.67861 18.7058 9.10801C18.4698 9.53741 18.1302 9.90108 17.718 10.1661L8.07102 16.4481C7.8878 16.5682 7.67313 16.6316 7.45402 16.6301ZM3.12102 11.4461L7.45402 14.2251L16.498 8.36206C16.6062 8.29181 16.6952 8.19566 16.7568 8.08233C16.8185 7.969 16.8508 7.84207 16.851 7.71306V2.62206L3.12102 11.4461Z" fill="white"/>
      <path d="M17.159 30.8849C16.7883 30.885 16.4256 30.7773 16.115 30.5749L1.565 21.1509C1.08519 20.8396 0.690724 20.4134 0.417423 19.911C0.144122 19.4086 0.000638521 18.8459 0 18.2739L0 12.7009C0.0034668 12.154 0.138247 11.6159 0.393 11.1319C0.464272 10.9949 0.563334 10.8742 0.683862 10.7776C0.804389 10.681 0.943734 10.6106 1.093 10.5709C1.24387 10.5323 1.40106 10.5251 1.55483 10.5497C1.70861 10.5743 1.8557 10.6302 1.987 10.7139L16.4 20.0589C16.4771 20.0858 16.5507 20.1221 16.619 20.1669L17.702 20.8669C18.1151 21.1313 18.4557 21.4947 18.6926 21.9242C18.9296 22.3536 19.0556 22.8354 19.059 23.3259V29.0179C19.0561 29.5213 18.8535 30.003 18.4958 30.3571C18.1381 30.7113 17.6544 30.909 17.151 30.9069L17.159 30.8849ZM2.216 13.4929V18.2779C2.2166 18.4838 2.26881 18.6862 2.36787 18.8667C2.46692 19.0471 2.60965 19.1999 2.783 19.3109L16.851 28.4349V23.3639C16.8505 23.2356 16.8182 23.1094 16.757 22.9966C16.6957 22.8839 16.6074 22.7881 16.5 22.7179L15.625 22.1379C15.5502 22.1125 15.4785 22.079 15.411 22.0379L2.216 13.4929Z" fill="white"/>
      <path d="M50.603 8.88398V9.91198C50.603 10.999 50.191 11.363 49.192 11.363H44.657C43.599 11.363 43.166 10.999 43.166 9.91198V9.48898C43.166 7.25598 41.988 6.28898 38.634 6.28898C35.28 6.28898 34.102 7.27298 34.102 9.48898V21.51C34.102 23.743 35.28 24.771 38.634 24.771C41.988 24.771 43.166 23.743 43.166 21.51V20.601C43.166 19.514 43.578 19.091 44.657 19.091H49.194C50.188 19.091 50.605 19.514 50.605 20.601V22.131C50.605 27.571 47.072 31.073 38.485 31.073C29.898 31.073 26.417 27.545 26.417 22.134V8.88398C26.417 3.50798 29.891 0.000976562 38.537 0.000976562C47.183 0.000976562 50.603 3.50798 50.603 8.88398Z" fill="white"/>
    </svg>
  );
}
