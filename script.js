// 전역 변수
let cart = [];
let currentProduct = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  loadCartFromStorage();
  updateCartCount();
  setupProductCardClicks();
  
  // 장바구니 전체 삭제 버튼 이벤트
  const clearCartBtn = document.querySelector('.cart-clear-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  // 카테고리 필터 초기화
  initCategoryFilter();

  // 신상품 타이머 초기화
  initNewTimer();

  // 특가 타이머 초기화
  initSaleTimer();

  // 상품 카드 클릭 이벤트
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // 구매 버튼 클릭이 아닌 경우에만 상세 페이지로 이동
      if (!e.target.closest('.buy-btn')) {
        const productLink = card.querySelector('h3 a');
        if (productLink) {
          window.location.href = productLink.href;
        }
      }
    });
  });

  // 히어로 섹션 애니메이션
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });
    
    observer.observe(heroSection);
  }

  // 특별이벤트 카드 애니메이션
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach((card, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
        }
  });
});

    observer.observe(card);
  });

  // 상품 카드 애니메이션
  const productCardsAnimated = document.querySelectorAll('.product-card');
  productCardsAnimated.forEach((card, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    });
    
    observer.observe(card);
  });
});

// 페이지 초기화
function initializePage() {
  // 상품 상세 페이지인 경우 상품 정보 로드
  if (window.location.pathname.includes('product-detail.html')) {
    loadProductDetails();
  }
  
  // 검색 기능 초기화
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchProducts();
      }
    });
  }
  
  // 로그인 폼 이벤트
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // 문의 폼 이벤트
const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContact);
  }
}

// 상품 상세 정보 로드
function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'A';
  
  const products = {
    'A': {
      name: '프리미엄 블루투스 이어폰',
      originalPrice: 89000,
      salePrice: 62300,
      discount: 30,
      rating: 5,
      reviewCount: 128,
      badge: 'SALE',
      badgeClass: 'sale-badge',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>고음질 블루투스 5.0</li>
          <li>액티브 노이즈 캔슬링</li>
          <li>20시간 연속 재생</li>
          <li>방수 기능 (IPX4)</li>
          <li>빠른 충전 (10분 충전으로 2시간 재생)</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-BT001</li>
          <li>연결방식: 블루투스 5.0</li>
          <li>배터리: 20시간 재생</li>
          <li>충전시간: 2시간</li>
        </ul>
      `
    },
    'B': {
      name: '스마트 워치 프로',
      originalPrice: 299000,
      salePrice: 239200,
      discount: 20,
      rating: 4,
      reviewCount: 95,
      badge: 'SALE',
      badgeClass: 'sale-badge',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>고해상도 AMOLED 디스플레이</li>
          <li>심박수 모니터링</li>
          <li>GPS 내장</li>
          <li>5ATM 방수</li>
          <li>7일 배터리 수명</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-WATCH001</li>
          <li>디스플레이: 1.4인치 AMOLED</li>
          <li>배터리: 7일 사용</li>
          <li>방수: 5ATM</li>
        </ul>
      `
    },
    'C': {
      name: '무선 충전 패드',
      originalPrice: 45000,
      salePrice: 38250,
      discount: 15,
      rating: 5,
      reviewCount: 67,
      badge: 'SALE',
      badgeClass: 'sale-badge',
      images: [
        'https://images.unsplash.com/photo-1609592806596-b43b7c1bafb8?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1609592806596-b43b7c1bafb8?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1609592806596-b43b7c1bafb8?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>15W 고속 충전</li>
          <li>Qi 표준 호환</li>
          <li>LED 상태 표시</li>
          <li>과열 보호 기능</li>
          <li>슬림한 디자인</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-CHARGER001</li>
          <li>충전 속도: 15W</li>
          <li>호환성: Qi 표준</li>
          <li>입력: 5V/2A</li>
        </ul>
      `
    },
    'D': {
      name: 'AI 스피커 스마트홈',
      originalPrice: 159000,
      salePrice: 159000,
      discount: 0,
      rating: 4,
      reviewCount: 42,
      badge: 'NEW',
      badgeClass: 'new-badge',
      images: [
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>AI 음성 인식</li>
          <li>스마트홈 제어</li>
          <li>360도 사운드</li>
          <li>WiFi/블루투스 연결</li>
          <li>다중 사용자 지원</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-AI001</li>
          <li>음성 인식: AI 기반</li>
          <li>연결: WiFi, 블루투스</li>
          <li>전원: AC 어댑터</li>
        </ul>
      `
    },
    'E': {
      name: '게이밍 키보드 RGB',
      originalPrice: 89000,
      salePrice: 89000,
      discount: 0,
      rating: 5,
      reviewCount: 78,
      badge: 'NEW',
      badgeClass: 'new-badge',
      images: [
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>RGB 백라이트</li>
          <li>기계식 스위치</li>
          <li>게이밍 모드</li>
          <li>매크로 키 지원</li>
          <li>USB-C 연결</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-KB001</li>
          <li>스위치: 기계식</li>
          <li>백라이트: RGB</li>
          <li>연결: USB-C</li>
        </ul>
      `
    },
    'F': {
      name: '스마트 LED 조명',
      originalPrice: 75000,
      salePrice: 75000,
      discount: 0,
      rating: 4,
      reviewCount: 31,
      badge: 'NEW',
      badgeClass: 'new-badge',
      images: [
        'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>1600만 색상 지원</li>
          <li>앱 제어</li>
          <li>음성 제어</li>
          <li>스케줄 설정</li>
          <li>WiFi 연결</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-LED001</li>
          <li>색상: 1600만 색상</li>
          <li>연결: WiFi</li>
          <li>전력: 9W</li>
        </ul>
      `
    },
    'G': {
      name: '노트북 스탠드',
      originalPrice: 35000,
      salePrice: 35000,
      discount: 0,
      rating: 4,
      reviewCount: 156,
      badge: '',
      badgeClass: '',
      images: [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>알루미늄 소재</li>
          <li>높이 조절 가능</li>
          <li>열 방출 설계</li>
          <li>휴대용</li>
          <li>다양한 노트북 호환</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-STAND001</li>
          <li>소재: 알루미늄</li>
          <li>최대 높이: 15cm</li>
          <li>무게: 500g</li>
        </ul>
      `
    },
    'H': {
      name: '무선 마우스',
      originalPrice: 25000,
      salePrice: 25000,
      discount: 0,
      rating: 5,
      reviewCount: 203,
      badge: '',
      badgeClass: '',
      images: [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>고정밀 센서</li>
          <li>6개 버튼</li>
          <li>RGB 백라이트</li>
          <li>충전식 배터리</li>
          <li>게이밍 모드</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-MOUSE001</li>
          <li>센서: 16000 DPI</li>
          <li>배터리: 충전식</li>
          <li>연결: 2.4GHz 무선</li>
        </ul>
      `
    },
    'I': {
      name: 'USB-C 케이블',
      originalPrice: 12000,
      salePrice: 12000,
      discount: 0,
      rating: 4,
      reviewCount: 89,
      badge: '',
      badgeClass: '',
      images: [
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=600&h=600&fit=crop&crop=center'
      ],
      description: `
        <h4>제품 특징</h4>
        <ul>
          <li>고속 충전 지원</li>
          <li>데이터 전송</li>
          <li>내구성 강화</li>
          <li>다양한 길이</li>
          <li>호환성 우수</li>
        </ul>
        <h4>제품 사양</h4>
        <ul>
          <li>브랜드: 스마트마켓</li>
          <li>모델명: SM-CABLE001</li>
          <li>길이: 1m</li>
          <li>충전: 최대 100W</li>
          <li>데이터: USB 3.1</li>
        </ul>
      `
    }
  };
  
  const product = products[productId];
  if (!product) return;
  
  currentProduct = { ...product, id: productId };
  
  // 상품 정보 업데이트
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-main-image').src = product.images[0];
  document.getElementById('product-main-image').alt = product.name;
  
  // 썸네일 이미지 업데이트
  const thumbnailContainer = document.querySelector('.thumbnail-images');
  thumbnailContainer.innerHTML = '';
  
  product.images.forEach((img, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = img;
    thumbnail.alt = product.name;
    thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
    thumbnail.onclick = function() {
      changeMainImage(this);
    };
    thumbnailContainer.appendChild(thumbnail);
  });
  
  // 가격 정보 업데이트
  if (product.discount > 0) {
    document.getElementById('original-price').textContent = `₩${product.originalPrice.toLocaleString()}`;
    document.getElementById('sale-price').textContent = `₩${product.salePrice.toLocaleString()}`;
    document.getElementById('discount-rate').textContent = `-${product.discount}%`;
    document.getElementById('final-price').style.display = 'none';
  } else {
    document.getElementById('original-price').style.display = 'none';
    document.getElementById('sale-price').style.display = 'none';
    document.getElementById('final-price').textContent = `₩${product.originalPrice.toLocaleString()}`;
    document.getElementById('discount-rate').style.display = 'none';
  }
  
  // 배지 업데이트
  const badge = document.getElementById('product-badge');
  if (product.badge) {
    badge.textContent = product.badge;
    badge.className = `badge ${product.badgeClass}`;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
  
  // 평점 업데이트
  document.getElementById('rating-count').textContent = `(${product.reviewCount}개 리뷰)`;
  
  // 상품 설명 업데이트
  document.getElementById('product-description').innerHTML = product.description;
  
  // 페이지 제목 업데이트
  document.title = `${product.name} - 스마트마켓`;
}

// 메인 이미지 변경
function changeMainImage(thumbnail) {
  const mainImage = document.getElementById('product-main-image');
  mainImage.src = thumbnail.src;
  mainImage.alt = thumbnail.alt;
  
  // 썸네일 활성화 상태 변경
  document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
  thumbnail.classList.add('active');
}

// 수량 변경
function changeQuantity(delta) {
  const quantityInput = document.getElementById('quantity');
  let currentQty = parseInt(quantityInput.value);
  let newQty = currentQty + delta;
  
  if (newQty >= 1 && newQty <= 99) {
    quantityInput.value = newQty;
  }
}

// 탭 변경
function showTab(tabName) {
  // 모든 탭 버튼 비활성화
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  
  // 선택된 탭 활성화
  document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
}

// 장바구니에 상품 추가
function addToCart() {
  if (!currentProduct) return;
  
  const quantity = parseInt(document.getElementById('quantity').value);
  const existingItem = cart.find(item => item.id === currentProduct.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.salePrice || currentProduct.originalPrice,
      image: currentProduct.images[0],
      quantity: quantity
    });
  }
  
  saveCartToStorage();
  updateCartCount();
  showNotification('장바구니에 추가되었습니다!');
}

// 바로구매
function buyNow() {
  addToCart();
  showCart();
}

// 장바구니 표시
function showCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">장바구니가 비어있습니다.</p>';
  } else {
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₩${item.price.toLocaleString()}</div>
        </div>
        <div class="cart-item-quantity">
          <button onclick="changeCartQuantity('${item.id}', -1)">-</button>
          <input type="number" value="${item.quantity}" min="1" max="99" onchange="updateCartQuantity('${item.id}', this.value)">
          <button onclick="changeCartQuantity('${item.id}', 1)">+</button>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">삭제</button>
      `;
      cartItems.appendChild(itemElement);
    });
  }
  
  updateCartTotal();
  cartModal.style.display = 'block';
}

// 장바구니 닫기
function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

// 장바구니 수량 변경
function changeCartQuantity(itemId, delta) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      item.quantity = newQuantity;
      saveCartToStorage();
      updateCartCount();
      updateCartTotal();
      showCart(); // 장바구니 다시 표시
    }
  }
}

// 장바구니 수량 업데이트
function updateCartQuantity(itemId, newQuantity) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.quantity = parseInt(newQuantity);
    saveCartToStorage();
    updateCartCount();
    updateCartTotal();
  }
}

// 장바구니에서 상품 제거
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCartToStorage();
  updateCartCount();
  updateCartTotal();
  showCart(); // 장바구니 다시 표시
}

// 장바구니 총액 업데이트
function updateCartTotal() {
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = totalPrice >= 50000 ? 0 : 3000;
  const finalPrice = totalPrice + shipping;
  
  document.getElementById('cart-total-price').textContent = `₩${totalPrice.toLocaleString()}`;
  document.getElementById('cart-shipping').textContent = `₩${shipping.toLocaleString()}`;
  document.getElementById('cart-final-price').textContent = `₩${finalPrice.toLocaleString()}`;
}

// 장바구니 개수 업데이트
function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// 장바구니 저장
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 장바구니 불러오기
function loadCartFromStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// 주문하기
function checkout() {
  if (cart.length === 0) {
    showNotification('장바구니가 비어있습니다.');
    return;
  }
  
  showNotification('주문이 완료되었습니다!');
  cart = [];
  saveCartToStorage();
  updateCartCount();
  closeCartModal();
}

// 로그인 모달 표시
function showLoginModal() {
  document.getElementById('login-modal').style.display = 'block';
}

// 로그인 모달 닫기
function closeLoginModal() {
  document.getElementById('login-modal').style.display = 'none';
}

// 로그인 처리
function handleLogin(e) {
  e.preventDefault();
  showNotification('로그인 기능은 개발 중입니다.');
  closeLoginModal();
}

// 문의 처리
function handleContact(e) {
  e.preventDefault();
  showNotification('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
  e.target.reset();
}

// 검색 기능
function searchProducts() {
  const searchTerm = document.getElementById('search-input').value.trim();
  if (!searchTerm) {
    showNotification('검색어를 입력해주세요.');
    return;
  }
  
  showNotification(`"${searchTerm}" 검색 결과를 확인해보세요!`);
  // 실제 검색 기능은 서버에서 구현
}

// FAQ 토글 기능
function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('i');
  
  if (answer.classList.contains('active')) {
    answer.classList.remove('active');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  } else {
    answer.classList.add('active');
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  }
}

// 특가 타이머 기능
function updateTimer() {
  const now = new Date();
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const timeLeft = endTime - now;
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  if (hoursElement && minutesElement && secondsElement) {
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
}

// 타이머 시작
if (document.getElementById('hours')) {
  updateTimer();
  setInterval(updateTimer, 1000);
}

// 상품 필터링 기능
function filterProducts() {
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const products = document.querySelectorAll('.product-card');
  
  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;
  
  products.forEach(product => {
    const category = product.dataset.category;
    const price = parseInt(product.dataset.price);
    
    let showProduct = true;
    
    // 카테고리 필터
    if (selectedCategory && category !== selectedCategory) {
      showProduct = false;
    }
    
    // 가격 필터
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-').map(p => p === '+' ? Infinity : parseInt(p));
      if (price < min || (max !== Infinity && price > max)) {
        showProduct = false;
      }
    }
    
    product.style.display = showProduct ? 'block' : 'none';
  });
}

// 상품 정렬 기능
function sortProducts() {
  const sortFilter = document.getElementById('sort-filter');
  const productsContainer = document.getElementById('products-container');
  const products = Array.from(productsContainer.children);
  
  const sortBy = sortFilter.value;
  
  products.sort((a, b) => {
    const priceA = parseInt(a.dataset.price);
    const priceB = parseInt(b.dataset.price);
    
    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'popular':
        // 평점 기준으로 정렬 (임시)
        return Math.random() - 0.5;
      case 'new':
        // NEW 배지가 있는 상품을 앞으로
        const aIsNew = a.querySelector('.new-badge');
        const bIsNew = b.querySelector('.new-badge');
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return 0;
      case 'rating':
        // 평점 기준으로 정렬 (임시)
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });
  
  products.forEach(product => productsContainer.appendChild(product));
}

// 뷰 변경 기능
function changeView(viewType) {
  const productsContainer = document.getElementById('products-container');
  const viewButtons = document.querySelectorAll('.view-btn');
  
  viewButtons.forEach(btn => btn.classList.remove('active'));
  event.target.closest('.view-btn').classList.add('active');
  
  if (viewType === 'list') {
    productsContainer.style.gridTemplateColumns = '1fr';
  } else {
    productsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  }
}

// 알림 표시
function showNotification(message, type = 'info') {
  // 기존 알림 제거
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // 새 알림 생성
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 3000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // 3초 후 제거
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
  const loginModal = document.getElementById('login-modal');
  const cartModal = document.getElementById('cart-modal');
  
  if (event.target === loginModal) {
    closeLoginModal();
  }
  if (event.target === cartModal) {
    closeCartModal();
  }
});

// 네비게이션 클릭 이벤트
document.addEventListener('click', function(e) {
  if (e.target.matches('.buy-btn')) {
    const productId = e.target.dataset.product;
    const productPrice = parseInt(e.target.dataset.price);
    
    // GA4 이벤트 추적
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        'transaction_id': 'T_' + Date.now(),
        'value': productPrice,
        'currency': 'KRW',
        'items': [{
          'item_id': productId,
          'item_name': e.target.closest('.product-card').querySelector('h3').textContent,
          'price': productPrice,
          'quantity': 1
        }]
      });
    }
    
    showNotification('상품이 장바구니에 추가되었습니다!');
  }
});

// 페이지 로드 시 GA4 이벤트 추적
if (typeof gtag !== 'undefined') {
  gtag('event', 'page_view', {
    'page_title': document.title,
    'page_location': window.location.href
  });
} 

// 상품 카드 클릭 이벤트 설정
function setupProductCardClicks() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // 구매하기 버튼 클릭은 무시
      if (e.target.closest('.buy-btn')) {
        return;
      }
      
      // 상품 링크가 있는지 확인
      const productLink = card.querySelector('h3 a');
      if (productLink) {
        window.location.href = productLink.href;
      }
    });
  });
} 

// 쇼핑 시작하기 버튼 기능
function scrollToProducts() {
  const productsSection = document.querySelector('.products-section');
  if (productsSection) {
    productsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// 특별이벤트 참여하기 기능
function participateEvent() {
  showNotification('특별이벤트에 참여되었습니다! 🎉', 'success');
  
  // 이벤트 참여 효과
  const eventBtn = document.querySelector('.event-btn.primary');
  if (eventBtn) {
    eventBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      eventBtn.style.transform = 'scale(1)';
    }, 150);
  }
}

// 이벤트 상세보기 기능
function showEventDetails() {
  const modal = document.createElement('div');
  modal.className = 'modal event-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2><i class="fas fa-gift"></i> 특별이벤트 상세정보</h2>
      <div class="event-details">
        <div class="event-detail-item">
          <h3><i class="fas fa-percentage"></i> 첫 구매 할인</h3>
          <p>첫 구매 시 최대 20% 할인 혜택을 드립니다.</p>
          <ul>
            <li>5만원 이상 구매 시 10% 할인</li>
            <li>10만원 이상 구매 시 15% 할인</li>
            <li>20만원 이상 구매 시 20% 할인</li>
          </ul>
        </div>
        <div class="event-detail-item">
          <h3><i class="fas fa-truck"></i> 무료배송</h3>
          <p>5만원 이상 구매 시 무료배송 서비스를 제공합니다.</p>
        </div>
        <div class="event-detail-item">
          <h3><i class="fas fa-gift"></i> 사은품 증정</h3>
          <p>10만원 이상 구매 시 고급 사은품을 증정합니다.</p>
        </div>
      </div>
      <button class="event-btn primary" onclick="participateEvent(); this.parentElement.parentElement.remove()">
        <i class="fas fa-star"></i> 이벤트 참여하기
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

// 장바구니 전체 삭제 기능
function clearCart() {
  cart = [];
  updateCartDisplay();
  showNotification('장바구니가 비워졌습니다.', 'success');
}

// 카테고리 필터 기능
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 활성 버튼 변경
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 신상품 타이머 기능
function initNewTimer() {
  const hoursEl = document.getElementById('new-hours');
  const minutesEl = document.getElementById('new-minutes');
  const secondsEl = document.getElementById('new-seconds');

  if (hoursEl && minutesEl && secondsEl) {
    let hours = 24;
    let minutes = 0;
    let seconds = 0;

    const timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else {
        clearInterval(timer);
        showNotification('신상품 출시 시간이 종료되었습니다!', 'info');
      }

      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
  }
} 

// 특가 타이머 기능
function initSaleTimer() {
  const hoursEl = document.getElementById('sale-hours');
  const minutesEl = document.getElementById('sale-minutes');
  const secondsEl = document.getElementById('sale-seconds');

  if (hoursEl && minutesEl && secondsEl) {
    let hours = 12;
    let minutes = 30;
    let seconds = 45;

    const timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else {
        clearInterval(timer);
        showNotification('특가 상품 판매가 종료되었습니다!', 'info');
      }

      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
  }
} 