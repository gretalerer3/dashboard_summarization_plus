import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

function GenerativeLogo(){
  const search = false
  const SVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="248" height="248" viewBox="0 0 248 248" fill="none">
      <g>
      <path d="M95.3631 227.635C91.4256 234.455 84.9824 234.455 81.0448 227.635C77.1072 220.815 80.3289 215.235 88.204 215.235C96.0791 215.235 99.3007 220.815 95.3631 227.635Z" fill="#FBBC04"/>
      <path d="M59.5679 32.3348C57.5991 35.7448 54.3779 35.7448 52.4088 32.3348C50.4397 28.9248 52.0508 26.1348 55.9888 26.1348C59.9268 26.1348 61.5367 28.9248 59.5679 32.3348Z" fill="#34A853"/>
      <path d="M190.222 112.935C198.097 99.2951 210.984 99.2951 218.859 112.935C226.734 126.575 220.291 137.735 204.541 137.735C188.791 137.735 182.347 126.575 190.222 112.935Z" fill="#4285F4"/>
      <path d="M25.5613 112.935C21.6238 119.755 15.1805 119.755 11.243 112.935C7.3055 106.115 10.5271 100.535 18.4021 100.535C26.2771 100.535 29.4988 106.115 25.5613 112.935Z" fill="#EA4335"/>
      <path d="M230.397 56.1977C229.412 54.4927 227.802 54.4927 226.817 56.1977C225.832 57.9027 226.638 59.2977 228.607 59.2977C230.576 59.2977 231.381 57.9027 230.397 56.1977Z" fill="#DADCE0"/>
      <path d="M24.6671 68.2004C24.7309 68.387 24.8516 68.549 25.012 68.6636C25.1725 68.7783 25.3648 68.84 25.5621 68.84C25.7593 68.84 25.9516 68.7783 26.1121 68.6636C26.2726 68.549 26.3932 68.387 26.4571 68.2004C26.9493 67.3479 26.5466 66.6504 25.5622 66.6504C24.5778 66.6504 24.1749 67.3479 24.6671 68.2004Z" fill="#DADCE0"/>
      <path d="M155.321 235.6C155.257 235.413 155.137 235.251 154.976 235.136C154.816 235.022 154.624 234.96 154.426 234.96C154.229 234.96 154.037 235.022 153.876 235.136C153.716 235.251 153.595 235.413 153.531 235.6C153.039 236.452 153.442 237.15 154.426 237.15C155.411 237.15 155.813 236.452 155.321 235.6Z" fill="#DADCE0"/>
      <path d="M239.441 120.9C239.378 120.714 239.257 120.552 239.096 120.437C238.936 120.322 238.744 120.261 238.546 120.261C238.349 120.261 238.157 120.322 237.996 120.437C237.836 120.552 237.715 120.714 237.651 120.9C237.159 121.753 237.562 122.45 238.546 122.45C239.531 122.45 239.934 121.753 239.441 120.9Z" fill="#DADCE0"/>
      <path d="M166.48 17.25C166.48 17.1175 166.533 16.9906 166.627 16.8969C166.721 16.8032 166.848 16.7504 166.98 16.75C167.046 16.7493 167.111 16.7618 167.172 16.7866C167.233 16.8115 167.289 16.8483 167.335 16.8949C167.382 16.9415 167.419 16.9969 167.443 17.0578C167.468 17.1188 167.481 17.1841 167.48 17.25V17.25C167.481 17.3159 167.468 17.3812 167.443 17.4422C167.419 17.5031 167.382 17.5585 167.335 17.6051C167.289 17.6517 167.233 17.6885 167.172 17.7134C167.111 17.7382 167.046 17.7507 166.98 17.75V17.75C166.848 17.7494 166.721 17.6966 166.627 17.6029C166.533 17.5093 166.481 17.3824 166.48 17.25V17.25ZM171.04 15.79C170.948 15.6944 170.897 15.566 170.899 15.4329C170.9 15.2999 170.955 15.173 171.05 15.08V15.08C171.096 15.0343 171.151 14.9983 171.212 14.974C171.272 14.9497 171.337 14.9377 171.402 14.9386C171.467 14.9396 171.532 14.9534 171.591 14.9794C171.651 15.0054 171.705 15.043 171.75 15.09V15.09C171.797 15.1351 171.835 15.1894 171.861 15.2496C171.887 15.3098 171.9 15.3745 171.9 15.44C171.9 15.5055 171.887 15.5702 171.861 15.6304C171.835 15.6906 171.797 15.7449 171.75 15.79V15.79C171.705 15.8372 171.65 15.8748 171.59 15.9005C171.53 15.9262 171.465 15.9394 171.399 15.9395V15.9395C171.333 15.9395 171.266 15.9263 171.205 15.9006C171.143 15.875 171.087 15.8374 171.04 15.79V15.79ZM162.22 15.77V15.76C162.173 15.7149 162.135 15.6606 162.109 15.6004C162.083 15.5402 162.07 15.4755 162.07 15.41C162.07 15.3445 162.083 15.2798 162.109 15.2196C162.135 15.1594 162.173 15.1051 162.22 15.06V15.06C162.266 15.0125 162.321 14.9747 162.382 14.9489C162.443 14.9231 162.509 14.9098 162.575 14.9098C162.641 14.9098 162.707 14.9231 162.768 14.9489C162.829 14.9747 162.884 15.0125 162.93 15.06V15.06C163.022 15.1554 163.073 15.2827 163.073 15.415C163.073 15.5473 163.022 15.6746 162.93 15.77V15.77C162.831 15.8595 162.703 15.9096 162.57 15.9107V15.9107C162.44 15.9095 162.315 15.8592 162.22 15.77V15.77ZM173.25 11.54C173.117 11.5374 172.989 11.4825 172.896 11.3871C172.802 11.2918 172.75 11.1635 172.75 11.03C172.75 10.9649 172.764 10.9005 172.789 10.8405C172.814 10.7805 172.851 10.7262 172.898 10.6806C172.944 10.6351 172.999 10.5992 173.06 10.575C173.12 10.5509 173.185 10.539 173.25 10.54V10.54C173.316 10.5393 173.381 10.5518 173.442 10.5766C173.503 10.6015 173.559 10.6383 173.605 10.6849C173.652 10.7315 173.689 10.7869 173.713 10.8478C173.738 10.9088 173.751 10.9741 173.75 11.04V11.04C173.748 11.1719 173.694 11.2979 173.601 11.3912C173.508 11.4845 173.382 11.5378 173.25 11.54V11.54ZM160.25 11V10.96V10.92C160.25 10.8539 160.263 10.7884 160.289 10.7276C160.315 10.6667 160.353 10.6117 160.4 10.5659C160.448 10.5201 160.504 10.4845 160.566 10.4611C160.628 10.4377 160.694 10.4272 160.76 10.43C160.891 10.4324 161.016 10.4862 161.107 10.5797C161.199 10.6733 161.25 10.7991 161.25 10.93V10.93V10.98V11C161.251 11.0658 161.238 11.1312 161.213 11.1921C161.188 11.2531 161.152 11.3085 161.105 11.355C161.058 11.4016 161.003 11.4384 160.942 11.4633C160.881 11.4882 160.816 11.5007 160.75 11.5V11.5C160.684 11.5007 160.619 11.4882 160.558 11.4633C160.497 11.4384 160.442 11.4016 160.395 11.355C160.348 11.3085 160.312 11.2531 160.287 11.1921C160.262 11.1312 160.249 11.0658 160.25 11V11ZM171.1 6.96C171.053 6.91487 171.015 6.86057 170.989 6.80041C170.963 6.74024 170.95 6.67546 170.95 6.61C170.95 6.54454 170.963 6.47976 170.989 6.41959C171.015 6.35943 171.053 6.30513 171.1 6.26C171.146 6.2126 171.201 6.17492 171.262 6.1492C171.323 6.12348 171.389 6.11022 171.455 6.11022C171.521 6.11022 171.587 6.12348 171.648 6.1492C171.709 6.17492 171.764 6.2126 171.81 6.26V6.26C171.903 6.35564 171.953 6.48402 171.952 6.61706C171.95 6.75011 171.895 6.877 171.8 6.97V6.97C171.705 7.05926 171.58 7.10928 171.45 7.11C171.384 7.1109 171.319 7.09801 171.259 7.07217C171.199 7.04633 171.145 7.00812 171.1 6.96V6.96ZM162.27 6.88C162.224 6.83348 162.189 6.7784 162.164 6.71794C162.14 6.65748 162.128 6.59284 162.129 6.52775C162.13 6.46266 162.144 6.39842 162.17 6.33873C162.196 6.27904 162.234 6.22509 162.281 6.18V6.18C162.327 6.1337 162.381 6.09694 162.441 6.07186C162.501 6.04677 162.565 6.03385 162.63 6.03385C162.695 6.03385 162.76 6.04677 162.82 6.07186C162.88 6.09694 162.934 6.1337 162.98 6.18V6.18C163.074 6.27431 163.127 6.40195 163.127 6.535C163.127 6.66805 163.074 6.79569 162.98 6.89V6.89C162.934 6.93535 162.879 6.97107 162.819 6.9951C162.759 7.01914 162.695 7.031 162.63 7.03V7.03C162.563 7.02988 162.497 7.01658 162.435 6.99084C162.373 6.9651 162.317 6.92744 162.27 6.88V6.88ZM167.05 5.25C166.918 5.24966 166.791 5.19687 166.697 5.10317C166.603 5.00948 166.55 4.8825 166.55 4.75V4.75C166.553 4.61648 166.608 4.48931 166.703 4.39582C166.798 4.30233 166.926 4.24997 167.06 4.25C167.125 4.25038 167.189 4.26364 167.249 4.28902C167.309 4.31441 167.364 4.35141 167.409 4.3979C167.455 4.44438 167.491 4.49943 167.515 4.55986C167.539 4.6203 167.551 4.68492 167.55 4.75C167.551 4.81584 167.538 4.88116 167.513 4.94211C167.488 5.00307 167.452 5.05845 167.405 5.10501C167.358 5.15157 167.303 5.18838 167.242 5.21327C167.181 5.23817 167.116 5.25065 167.05 5.25Z" fill="#202124"/>
      <path d="M202.78 210C202.715 209.999 202.65 209.986 202.59 209.96C202.53 209.934 202.476 209.897 202.43 209.85C202.337 209.757 202.283 209.632 202.28 209.5C202.283 209.435 202.296 209.371 202.319 209.31C202.344 209.25 202.382 209.195 202.429 209.15C202.498 209.08 202.586 209.032 202.683 209.013C202.779 208.993 202.879 209.003 202.97 209.04C203.034 209.063 203.093 209.1 203.14 209.149C203.185 209.195 203.219 209.25 203.241 209.309C203.269 209.369 203.282 209.434 203.281 209.499C203.281 209.63 203.231 209.756 203.14 209.849C203.094 209.898 203.038 209.936 202.976 209.962C202.914 209.988 202.847 210.001 202.78 210Z" fill="#202124"/>
      <path d="M211.899 209.5C211.9 209.434 211.914 209.368 211.939 209.307C211.965 209.246 212.003 209.19 212.051 209.144C212.098 209.097 212.154 209.061 212.216 209.036C212.278 209.011 212.344 208.999 212.41 209C212.542 209 212.669 209.053 212.763 209.147C212.857 209.241 212.91 209.368 212.91 209.5C212.91 209.633 212.857 209.759 212.763 209.853C212.669 209.947 212.542 210 212.41 210C212.344 210.001 212.278 209.989 212.216 209.964C212.154 209.939 212.098 209.903 212.051 209.856C212.003 209.81 211.965 209.754 211.939 209.693C211.914 209.632 211.9 209.566 211.899 209.5ZM207.089 209.5C207.09 209.368 207.142 209.24 207.236 209.147C207.33 209.053 207.457 209 207.589 209C207.655 208.999 207.721 209.012 207.782 209.037C207.842 209.062 207.898 209.098 207.944 209.145C207.991 209.192 208.028 209.247 208.053 209.308C208.078 209.369 208.09 209.434 208.089 209.5C208.09 209.566 208.078 209.631 208.053 209.692C208.028 209.753 207.991 209.809 207.944 209.855C207.898 209.902 207.842 209.939 207.782 209.963C207.721 209.988 207.655 210.001 207.589 210C207.457 210 207.33 209.947 207.236 209.853C207.143 209.759 207.09 209.632 207.089 209.5Z" fill="#202124"/>
      <path d="M217.22 210C217.155 210.002 217.09 209.989 217.031 209.96C216.966 209.936 216.908 209.899 216.86 209.85C216.769 209.756 216.719 209.631 216.72 209.5C216.719 209.435 216.729 209.371 216.75 209.31C216.778 209.252 216.815 209.198 216.859 209.15C216.93 209.08 217.02 209.032 217.118 209.012C217.216 208.993 217.318 209.002 217.41 209.04C217.471 209.063 217.525 209.101 217.569 209.149C217.617 209.194 217.654 209.249 217.679 209.309C217.703 209.37 217.717 209.434 217.719 209.499C217.717 209.631 217.663 209.757 217.569 209.849C217.525 209.898 217.471 209.936 217.411 209.962C217.351 209.988 217.286 210.001 217.22 210Z" fill="#202124"/>
      <path d="M202.78 235C202.715 234.999 202.65 234.986 202.59 234.96C202.53 234.934 202.475 234.897 202.429 234.85C202.381 234.805 202.343 234.751 202.318 234.691C202.292 234.631 202.279 234.566 202.28 234.5C202.283 234.368 202.336 234.243 202.429 234.149C202.473 234.101 202.528 234.063 202.589 234.04C202.682 234.003 202.783 233.994 202.881 234.013C202.978 234.033 203.068 234.08 203.139 234.149C203.23 234.244 203.28 234.369 203.28 234.499C203.28 234.63 203.23 234.755 203.139 234.849C203.092 234.898 203.034 234.936 202.969 234.959C202.911 234.988 202.846 235.002 202.78 235Z" fill="#202124"/>
      <path d="M211.91 234.5C211.909 234.435 211.921 234.37 211.945 234.31C211.969 234.25 212.005 234.195 212.05 234.148C212.096 234.102 212.15 234.065 212.21 234.039C212.27 234.014 212.334 234 212.399 234C212.466 233.999 212.531 234.011 212.593 234.036C212.655 234.061 212.711 234.097 212.758 234.144C212.806 234.19 212.844 234.246 212.87 234.307C212.896 234.368 212.909 234.434 212.91 234.5C212.907 234.634 212.852 234.761 212.756 234.854C212.661 234.948 212.533 235 212.399 235C212.268 234.997 212.144 234.943 212.052 234.85C211.961 234.757 211.91 234.631 211.91 234.5ZM207.1 234.5C207.099 234.435 207.111 234.37 207.135 234.31C207.159 234.249 207.195 234.194 207.241 234.148C207.286 234.101 207.341 234.064 207.4 234.039C207.46 234.014 207.525 234 207.59 234C207.656 233.999 207.721 234.012 207.782 234.037C207.843 234.062 207.898 234.098 207.945 234.145C207.992 234.192 208.028 234.247 208.053 234.308C208.078 234.369 208.091 234.434 208.09 234.5C208.089 234.633 208.037 234.759 207.943 234.853C207.849 234.947 207.722 235 207.59 235C207.459 234.997 207.334 234.944 207.243 234.85C207.151 234.757 207.1 234.631 207.1 234.5Z" fill="#202124"/>
      <path d="M217.22 235C217.153 235.001 217.086 234.988 217.025 234.962C216.963 234.936 216.907 234.898 216.86 234.85C216.814 234.804 216.779 234.749 216.754 234.689C216.73 234.629 216.719 234.565 216.72 234.5C216.719 234.435 216.729 234.371 216.75 234.31C216.778 234.252 216.815 234.198 216.859 234.15C216.955 234.059 217.082 234.008 217.214 234.008C217.347 234.008 217.474 234.059 217.569 234.15C217.617 234.195 217.655 234.249 217.679 234.31C217.703 234.371 217.717 234.435 217.719 234.5C217.717 234.632 217.663 234.757 217.569 234.85C217.526 234.898 217.471 234.936 217.41 234.96C217.351 234.988 217.286 235.001 217.22 235Z" fill="#202124"/>
      <path d="M199.94 230.58C199.877 230.464 199.861 230.328 199.897 230.201C199.932 230.074 200.016 229.966 200.13 229.899C200.186 229.866 200.249 229.844 200.314 229.835C200.379 229.826 200.445 229.83 200.508 229.847C200.571 229.864 200.63 229.893 200.682 229.933C200.734 229.973 200.778 230.023 200.81 230.08C200.843 230.137 200.865 230.2 200.874 230.266C200.883 230.331 200.88 230.398 200.863 230.462C200.846 230.526 200.817 230.586 200.777 230.639C200.737 230.692 200.687 230.736 200.63 230.769C200.552 230.808 200.467 230.829 200.38 230.83C200.292 230.829 200.205 230.805 200.128 230.761C200.051 230.718 199.986 230.655 199.94 230.58ZM197.54 226.42C197.472 226.305 197.454 226.167 197.487 226.038C197.521 225.908 197.605 225.798 197.72 225.73C197.836 225.666 197.972 225.65 198.099 225.685C198.226 225.721 198.334 225.805 198.4 225.92C198.433 225.976 198.455 226.039 198.464 226.104C198.473 226.168 198.469 226.234 198.452 226.298C198.435 226.361 198.406 226.42 198.366 226.472C198.326 226.524 198.277 226.567 198.22 226.6C198.143 226.643 198.058 226.667 197.97 226.67C197.883 226.67 197.797 226.647 197.721 226.603C197.646 226.559 197.583 226.496 197.54 226.42Z" fill="#202124"/>
      <path d="M195.569 222.5C195.501 222.501 195.433 222.488 195.37 222.46C195.309 222.436 195.254 222.399 195.21 222.35C195.12 222.256 195.069 222.13 195.069 222C195.069 221.87 195.12 221.744 195.21 221.65C195.306 221.559 195.433 221.508 195.565 221.508C195.697 221.508 195.824 221.559 195.92 221.65C195.967 221.695 196.005 221.75 196.03 221.81C196.056 221.87 196.069 221.935 196.069 222C196.069 222.065 196.056 222.13 196.03 222.19C196.005 222.25 195.967 222.305 195.92 222.35C195.876 222.398 195.821 222.436 195.76 222.46C195.7 222.488 195.635 222.501 195.569 222.5Z" fill="#202124"/>
      <path d="M224.43 222.5C224.364 222.501 224.299 222.488 224.239 222.462C224.179 222.437 224.124 222.398 224.08 222.35C224.032 222.305 223.995 222.251 223.969 222.19C223.943 222.13 223.93 222.066 223.93 222C223.93 221.935 223.943 221.87 223.969 221.81C223.995 221.749 224.032 221.695 224.08 221.65C224.176 221.559 224.303 221.508 224.435 221.508C224.567 221.508 224.694 221.559 224.79 221.65C224.88 221.745 224.93 221.87 224.93 222C224.93 222.13 224.88 222.256 224.79 222.35C224.743 222.398 224.687 222.436 224.626 222.462C224.564 222.488 224.497 222.501 224.43 222.5Z" fill="#202124"/>
      <path d="M221.59 218.08C221.527 217.964 221.511 217.828 221.547 217.701C221.582 217.574 221.666 217.466 221.781 217.399C221.837 217.366 221.899 217.344 221.964 217.335C222.029 217.326 222.095 217.33 222.158 217.347C222.222 217.364 222.281 217.393 222.333 217.433C222.385 217.473 222.428 217.523 222.461 217.58C222.528 217.695 222.546 217.833 222.513 217.962C222.479 218.091 222.396 218.202 222.281 218.269C222.203 218.308 222.117 218.329 222.031 218.33C221.942 218.329 221.855 218.306 221.778 218.262C221.701 218.218 221.636 218.156 221.59 218.08ZM219.19 213.92C219.123 213.804 219.104 213.667 219.138 213.538C219.172 213.408 219.256 213.298 219.371 213.23C219.486 213.166 219.622 213.15 219.75 213.186C219.877 213.221 219.985 213.305 220.051 213.42C220.084 213.476 220.106 213.539 220.115 213.604C220.124 213.668 220.12 213.734 220.103 213.798C220.086 213.861 220.057 213.92 220.017 213.972C219.977 214.024 219.927 214.068 219.871 214.1C219.793 214.14 219.708 214.161 219.621 214.161C219.534 214.162 219.448 214.141 219.373 214.099C219.297 214.056 219.234 213.995 219.19 213.92Z" fill="#202124"/>
      <path d="M219.37 230.77C219.255 230.702 219.171 230.592 219.137 230.462C219.103 230.333 219.122 230.195 219.19 230.08C219.222 230.023 219.266 229.973 219.318 229.933C219.37 229.893 219.429 229.864 219.492 229.847C219.556 229.831 219.622 229.826 219.687 229.835C219.752 229.844 219.814 229.866 219.871 229.899C219.927 229.932 219.977 229.975 220.017 230.027C220.057 230.079 220.086 230.139 220.103 230.202C220.119 230.265 220.123 230.331 220.114 230.396C220.105 230.461 220.084 230.524 220.051 230.58C220.007 230.656 219.945 230.719 219.869 230.763C219.794 230.807 219.708 230.83 219.621 230.83C219.534 230.829 219.448 230.809 219.37 230.77ZM221.78 226.6C221.666 226.534 221.582 226.426 221.546 226.299C221.51 226.172 221.526 226.036 221.589 225.92C221.658 225.805 221.768 225.722 221.897 225.686C222.025 225.651 222.163 225.667 222.28 225.73C222.395 225.798 222.478 225.909 222.512 226.038C222.546 226.167 222.527 226.305 222.46 226.42C222.417 226.496 222.354 226.559 222.279 226.603C222.203 226.647 222.117 226.67 222.03 226.67C221.942 226.672 221.855 226.647 221.78 226.6Z" fill="#202124"/>
      <path d="M197.72 218.27C197.663 218.237 197.613 218.192 197.573 218.14C197.533 218.087 197.504 218.027 197.487 217.963C197.47 217.899 197.466 217.832 197.475 217.766C197.485 217.701 197.506 217.638 197.54 217.581C197.572 217.524 197.616 217.474 197.668 217.434C197.719 217.394 197.779 217.365 197.842 217.348C197.905 217.331 197.971 217.327 198.036 217.336C198.101 217.345 198.164 217.367 198.22 217.4C198.277 217.432 198.327 217.476 198.367 217.528C198.407 217.58 198.436 217.639 198.453 217.703C198.469 217.766 198.473 217.832 198.464 217.897C198.455 217.962 198.433 218.024 198.4 218.081C198.357 218.157 198.294 218.22 198.219 218.264C198.143 218.308 198.057 218.331 197.97 218.331C197.883 218.33 197.798 218.309 197.72 218.27ZM200.13 214.1C200.016 214.034 199.932 213.926 199.896 213.799C199.861 213.672 199.876 213.536 199.94 213.42C200.008 213.306 200.118 213.222 200.247 213.187C200.375 213.151 200.513 213.167 200.63 213.23C200.745 213.298 200.829 213.408 200.863 213.538C200.896 213.667 200.877 213.805 200.81 213.92C200.767 213.996 200.704 214.059 200.629 214.103C200.553 214.147 200.467 214.17 200.38 214.17C200.292 214.172 200.205 214.147 200.13 214.1Z" fill="#202124"/>
      <path d="M16.2002 175.5C16.1314 175.501 16.0632 175.487 16.0002 175.46C15.9389 175.436 15.8841 175.399 15.8402 175.35C15.7747 175.278 15.7299 175.19 15.7105 175.095C15.6911 175 15.6979 174.901 15.7302 174.81C15.7585 174.751 15.7956 174.697 15.8402 174.65C15.8841 174.601 15.9389 174.563 16.0002 174.54C16.0925 174.502 16.194 174.492 16.2918 174.512C16.3897 174.531 16.4795 174.579 16.5502 174.65C16.5979 174.695 16.6354 174.749 16.6602 174.81C16.6841 174.871 16.6976 174.935 16.7002 175C16.6965 175.065 16.6831 175.129 16.6602 175.19C16.6321 175.249 16.595 175.303 16.5502 175.35C16.5063 175.399 16.4515 175.436 16.3902 175.46C16.3307 175.487 16.2657 175.501 16.2002 175.5Z" fill="#202124"/>
      <path d="M17.7503 172.31C17.693 172.277 17.6429 172.232 17.6028 172.179C17.5627 172.127 17.5335 172.066 17.5168 172.002C17.5 171.938 17.4962 171.871 17.5053 171.805C17.5145 171.74 17.5366 171.677 17.5703 171.619C17.6375 171.506 17.7464 171.424 17.8735 171.391C18.0007 171.357 18.136 171.374 18.2503 171.439C18.3655 171.507 18.4492 171.618 18.4829 171.747C18.5167 171.877 18.4977 172.014 18.4303 172.129C18.3871 172.205 18.3246 172.269 18.249 172.312C18.1735 172.356 18.0877 172.379 18.0003 172.379C17.9129 172.375 17.8275 172.351 17.7503 172.31Z" fill="#202124"/>
      <path d="M19.8003 169.25C19.7348 169.251 19.6698 169.237 19.6103 169.21C19.5491 169.186 19.4943 169.149 19.4503 169.1C19.4055 169.053 19.3684 168.999 19.3403 168.94C19.3174 168.879 19.304 168.815 19.3003 168.75C19.3029 168.685 19.3164 168.621 19.3403 168.56C19.3651 168.499 19.4026 168.445 19.4503 168.4C19.4943 168.351 19.5491 168.314 19.6103 168.29C19.7354 168.24 19.8752 168.24 20.0003 168.29C20.0616 168.313 20.1165 168.351 20.1603 168.4C20.2047 168.448 20.2418 168.502 20.2703 168.56C20.2908 168.621 20.301 168.685 20.3003 168.75C20.3001 168.815 20.29 168.879 20.2703 168.94C20.242 168.999 20.2049 169.053 20.1603 169.1C20.1164 169.149 20.0616 169.187 20.0003 169.21C19.9372 169.237 19.869 169.251 19.8003 169.25Z" fill="#202124"/>
      <path d="M19.8003 181.75C19.7348 181.75 19.6701 181.737 19.6099 181.711C19.5498 181.685 19.4955 181.647 19.4503 181.6C19.4033 181.555 19.3657 181.5 19.34 181.44C19.3142 181.38 19.3007 181.315 19.3003 181.25C19.304 181.185 19.3175 181.121 19.3403 181.06C19.3652 181 19.4027 180.945 19.4503 180.9C19.5211 180.83 19.611 180.782 19.7088 180.762C19.8065 180.743 19.9079 180.752 20.0003 180.79C20.0616 180.813 20.1164 180.851 20.1603 180.899C20.2046 180.947 20.2417 181.001 20.2703 181.059C20.2931 181.12 20.3066 181.184 20.3103 181.249C20.3076 181.314 20.2941 181.378 20.2703 181.439C20.2456 181.5 20.2081 181.554 20.1603 181.599C20.1162 181.647 20.0614 181.685 20.0003 181.709C19.9377 181.738 19.8692 181.752 19.8003 181.75Z" fill="#202124"/>
      <path d="M21.3602 178.56C21.2451 178.492 21.1614 178.382 21.1277 178.253C21.094 178.123 21.1128 177.986 21.1802 177.871C21.2469 177.757 21.3557 177.674 21.4831 177.64C21.6104 177.607 21.7459 177.624 21.8602 177.69C21.9174 177.723 21.9674 177.768 22.0074 177.821C22.0473 177.873 22.0765 177.934 22.0932 177.998C22.11 178.062 22.1139 178.128 22.1048 178.194C22.0957 178.26 22.0737 178.323 22.0402 178.38C21.9969 178.456 21.9343 178.519 21.8588 178.563C21.7833 178.607 21.6976 178.63 21.6102 178.63C21.5225 178.627 21.4368 178.603 21.3602 178.56Z" fill="#202124"/>
      <path d="M23.4102 175.5C23.3447 175.501 23.2797 175.487 23.2202 175.46C23.1576 175.439 23.1021 175.401 23.0602 175.35C23.0124 175.305 22.9748 175.251 22.9502 175.19C22.9238 175.13 22.9102 175.065 22.9102 175C22.9102 174.935 22.9238 174.87 22.9502 174.81C22.975 174.749 23.0125 174.695 23.0602 174.65C23.1291 174.58 23.2172 174.532 23.3134 174.513C23.4096 174.493 23.5095 174.503 23.6002 174.54C23.6657 174.561 23.7244 174.599 23.7702 174.65C23.8147 174.697 23.8518 174.751 23.8802 174.81C23.9007 174.871 23.9109 174.935 23.9102 175C23.91 175.064 23.8999 175.129 23.8802 175.19C23.8519 175.249 23.8148 175.303 23.7702 175.35C23.723 175.397 23.667 175.435 23.6052 175.461C23.5434 175.487 23.4771 175.5 23.4102 175.5Z" fill="#202124"/>
      <path d="M19.3003 175C19.3007 174.934 19.3143 174.868 19.3402 174.807C19.3662 174.746 19.4039 174.69 19.4513 174.644C19.4987 174.597 19.5548 174.561 19.6164 174.536C19.678 174.511 19.7439 174.499 19.8103 174.5C19.9428 174.5 20.0697 174.553 20.1634 174.647C20.2571 174.741 20.3099 174.868 20.3103 175C20.3098 175.132 20.257 175.259 20.1633 175.353C20.0696 175.447 19.9427 175.5 19.8103 175.5C19.7439 175.501 19.6781 175.489 19.6165 175.464C19.5549 175.439 19.4988 175.402 19.4514 175.356C19.404 175.31 19.3663 175.254 19.3403 175.193C19.3144 175.132 19.3008 175.066 19.3003 175Z" fill="#202124"/>
      <path d="M15.7002 168.75C15.6996 168.684 15.7121 168.619 15.7369 168.558C15.7618 168.497 15.7986 168.442 15.8452 168.395C15.8918 168.348 15.9471 168.312 16.0081 168.287C16.0691 168.262 16.1344 168.249 16.2002 168.25C16.3327 168.25 16.4597 168.303 16.5534 168.397C16.6471 168.491 16.6999 168.618 16.7002 168.75C16.6998 168.883 16.647 169.009 16.5533 169.103C16.4596 169.197 16.3327 169.25 16.2002 169.25C16.1344 169.251 16.0691 169.238 16.0082 169.213C15.9472 169.188 15.8918 169.151 15.8453 169.105C15.7987 169.058 15.7619 169.003 15.737 168.942C15.7121 168.881 15.6996 168.816 15.7002 168.75Z" fill="#202124"/>
      <path d="M12.5901 169.25C12.5245 169.252 12.4593 169.238 12.4001 169.21C12.3358 169.187 12.2777 169.149 12.2301 169.1C12.1393 169.006 12.089 168.881 12.0901 168.75C12.0877 168.684 12.1014 168.619 12.1301 168.56C12.1513 168.5 12.1855 168.445 12.2301 168.4C12.3008 168.33 12.3907 168.281 12.4885 168.262C12.5864 168.242 12.6878 168.252 12.7801 168.29C12.8413 168.314 12.8961 168.351 12.9401 168.4C12.9878 168.445 13.0254 168.499 13.0501 168.56C13.074 168.621 13.0876 168.685 13.0901 168.75C13.0873 168.882 13.0336 169.007 12.9401 169.1C12.8961 169.149 12.8413 169.186 12.7801 169.21C12.7206 169.237 12.6557 169.251 12.5901 169.25Z" fill="#202124"/>
      <path d="M17.5701 178.38C17.5365 178.323 17.5145 178.26 17.5053 178.194C17.4962 178.129 17.5001 178.062 17.5168 177.998C17.5335 177.934 17.5627 177.873 17.6028 177.821C17.6428 177.768 17.6929 177.723 17.7501 177.69C17.8645 177.625 17.9999 177.607 18.1271 177.641C18.2543 177.675 18.3631 177.757 18.4301 177.871C18.4975 177.986 18.5164 178.123 18.4827 178.253C18.4489 178.382 18.3653 178.492 18.2501 178.56C18.1735 178.603 18.0878 178.627 18.0001 178.63C17.9128 178.63 17.827 178.607 17.7514 178.563C17.6759 178.519 17.6133 178.456 17.5701 178.38Z" fill="#202124"/>
      <path d="M13.9603 172.12C13.9272 172.064 13.9055 172.001 13.8967 171.936C13.8878 171.872 13.8918 171.806 13.9086 171.742C13.9253 171.679 13.9544 171.62 13.9942 171.568C14.0339 171.516 14.0836 171.473 14.1403 171.44C14.2545 171.374 14.39 171.356 14.5173 171.39C14.6446 171.424 14.7535 171.506 14.8203 171.62C14.854 171.677 14.8761 171.74 14.8853 171.806C14.8945 171.872 14.8907 171.939 14.8739 172.003C14.8572 172.067 14.828 172.127 14.7879 172.18C14.7478 172.233 14.6976 172.277 14.6403 172.31C14.5637 172.353 14.478 172.377 14.3903 172.38C14.3016 172.381 14.2146 172.356 14.1388 172.31C14.063 172.265 14.0012 172.199 13.9603 172.12Z" fill="#202124"/>
      <path d="M21.1702 172.13C21.1067 172.013 21.0911 171.875 21.1265 171.747C21.1619 171.618 21.2456 171.508 21.3602 171.44C21.4745 171.375 21.6098 171.357 21.7369 171.391C21.8641 171.425 21.973 171.507 22.0402 171.62C22.0738 171.677 22.0958 171.74 22.1049 171.806C22.1141 171.872 22.1102 171.939 22.0934 172.003C22.0767 172.067 22.0475 172.127 22.0075 172.18C21.9674 172.233 21.9174 172.277 21.8602 172.311C21.783 172.352 21.6976 172.376 21.6102 172.381C21.5216 172.379 21.4348 172.356 21.3579 172.312C21.2809 172.268 21.2163 172.206 21.1702 172.13Z" fill="#202124"/>
      </g>
      <path fill="#202124" stroke="black" strokeDashoffset={500} strokeDasharray={500}  d="M69.3321 69.3321C71.6575 67.0066 74.8115 65.7002 78.1002 65.7002H169.9C173.189 65.7002 176.343 67.0066 178.668 69.3321C180.994 71.6575 182.3 74.8115 182.3 78.1002V146.9C182.3 150.197 180.998 153.36 178.678 155.701C176.357 158.042 173.205 159.371 169.909 159.4L169.9 159.4H90.0144L67.4073 182.007C67.1213 182.293 66.6912 182.379 66.3175 182.224C65.9438 182.069 65.7002 181.705 65.7002 181.3V78.1002C65.7002 74.8115 67.0066 71.6575 69.3321 69.3321ZM169.9 67.7002H78.1002C75.3419 67.7002 72.6967 68.7959 70.7463 70.7463C68.7959 72.6967 67.7002 75.3419 67.7002 78.1002V178.886L88.8931 157.693C89.0806 157.506 89.335 157.4 89.6002 157.4H169.896C172.663 157.375 175.309 156.258 177.257 154.293C179.207 152.326 180.3 149.669 180.3 146.9V78.1002C180.3 75.3419 179.204 72.6967 177.254 70.7463C175.304 68.7959 172.658 67.7002 169.9 67.7002ZM83.5002 83.9002C83.5002 83.3479 83.9479 82.9002 84.5002 82.9002H164.1C164.652 82.9002 165.1 83.3479 165.1 83.9002V95.3002C165.1 95.8525 164.652 96.3002 164.1 96.3002H84.5002C83.9479 96.3002 83.5002 95.8525 83.5002 95.3002V83.9002ZM85.5002 84.9002V94.3002H163.1V84.9002H85.5002ZM83.5002 106.8C83.5002 106.248 83.9479 105.8 84.5002 105.8H164.1C164.652 105.8 165.1 106.248 165.1 106.8V118.3C165.1 118.852 164.652 119.3 164.1 119.3H84.5002C83.9479 119.3 83.5002 118.852 83.5002 118.3V106.8ZM85.5002 107.8V117.3H163.1V107.8H85.5002ZM83.5002 129.7C83.5002 129.148 83.9479 128.7 84.5002 128.7H141.2C141.752 128.7 142.2 129.148 142.2 129.7V141.2C142.2 141.752 141.752 142.2 141.2 142.2H84.5002C83.9479 142.2 83.5002 141.752 83.5002 141.2V129.7ZM85.5002 130.7V140.2H140.2V130.7H85.5002Z">
      <animate
          attributeName="stroke-dashoffset"
          begin="0.1s;f1.end+0.4s"
          values="2037;0;2037"
          dur="100s"
          calcMode="linear"
      /> 
      </path>
    </svg>
  )
  return (
    <div style={{display:'flex',flexDirection:'column', alignItems:'center',height:'90%',width:'100%'}}>
      {SVG()}
    </div>
  )
}

function LandingPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [debouncedLabelInput, setDebouncedLabelInput] = useState('');

  const handleOptionClick = (option) => {
    setSelectedRole(option);
    console.log(`Selected role: ${option}`);
  };

  const handleInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setDebouncedLabelInput(labelInput);
      console.log(`Label input recorded: ${labelInput}`);
      sendDataToBackend(selectedRole, labelInput);
    }
  };

  const sendDataToBackend = async (role, input) => {
    try {
      const response = await fetch('http://localhost:5001/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, input }),
      });
      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const docs = [
    {
      title: 'No Code Prompt Tuning',
      model: 'Vertex AI Generative AI Studio',
      description:
        'No code prompt tuning of foundational model with generated Python code for engineer hand off.',
      doc: 'https://cloud.google.com/vertex-ai/docs/generative-ai/learn/generative-ai-studio',
    },
    {
      title: 'Generative Summarization',
      model: 'gemini-pro',
      description:
        'Multi-modal model by Google. Used to generate summaries for each dashboard query and stream the results to the extension',
      doc: 'https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/quickstart-multimodal',
    },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflowY: 'scroll',
        }}
      >
        <DropdownMenu selectedOption={selectedRole} handleOptionClick={handleOptionClick} />
        <label>
          What are the actions you wanna take from this dashboard? What questions are you asking?
          <input value={labelInput} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        </label>
        {docs.map((doc, index) => (
          <a
            href={doc.doc}
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            <div
              style={{
                cursor: 'pointer',
                width: '70vw',
                maxWidth: '75vw',
                height: 'auto',
                marginTop: '2rem',
              }}
              className="summaryCard"
            >
              <div
                style={{
                  width: 'auto',
                  height: 'auto',
                  borderRight: '1px solid #ccc',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <img
                  height="auto"
                  width={60}
                  src={
                    index === 0
                      ? 'https://lh3.googleusercontent.com/-1brN-k2sapOWO4gfdJKGEH8kZbfFjrzEMjNs1dl4u64PBH-yxVmB5vG2aHDatRudSByL3lwViUg1w'
                      : 'https://lh3.googleusercontent.com/-1brN-k2sapOWO4gfdJKGEH8kZbfFjrzEMjNs1dl4u64PBH-yxVmB5vG2aHDatRudSByL3lwViUg1w'
                  }
                />
              </div>
              <div
                style={{
                  paddingTop: '0.2rem',
                  paddingLeft: '1rem',
                  width: '80%',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    height: 'auto',
                    fontSize: '1vh',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    letterSpacing: '0.01rem',
                    display: 'block',
                    textAlign: 'left',
                    width: '100%',
                    color: 'black',
                    border: 'none',
                  }}
                >
                  {doc.title}
                </span>
                <p style={{ color: 'rgb(26, 115, 232)', fontSize: '0.8vh', margin: 0 }}>
                  {doc.model}
                </p>
                <p
                  style={{
                    fontSize: '0.9vh',
                    width: 'auto',
                    height: 'auto',
                    color: 'black',
                    opacity: 0.8,
                  }}
                >
                  {doc.description}
                </p>
              </div>
            </div>
          </a>
        ))}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
          }}
        ></div>
      </div>
    </>
  );
}

export { LandingPage, GenerativeLogo};
