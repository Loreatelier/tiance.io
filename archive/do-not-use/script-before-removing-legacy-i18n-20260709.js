const nav = document.querySelector(".floating-nav");
const mobileNavDisclosure = document.querySelector(".mobile-nav-disclosure");
const navMenuToggle = document.querySelector(".nav-menu-toggle");
const mobileNavMenu = document.querySelector(".mobile-nav-menu");
const videoButton = document.querySelector("[data-video]");
const revealItems = document.querySelectorAll(".reveal");
const applicationCtas = document.querySelectorAll("[data-application-cta]");
const contactTabButtons = document.querySelectorAll("[data-contact-tab]");
const contactPanels = document.querySelectorAll("[data-contact-panel]");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactCopyButtons = document.querySelectorAll("[data-copy]");
const applicationModal = document.querySelector("[data-application-modal]");
const applicationModalBody = document.querySelector("[data-application-modal-body]");
const applicationModalOpen = document.querySelector("[data-application-modal-open]");
const applicationModalClose = document.querySelector("[data-application-modal-close]");
const languageToggleButtons = document.querySelectorAll("[data-language-toggle]");
const testimonialTrack = document.querySelector(".testimonial-track");

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
const languageStorageKey = "tiance-language";
let activeLocale = "en";

const getSavedLocale = () => {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
};

const setSavedLocale = (locale) => {
  try {
    localStorage.setItem(languageStorageKey, locale);
  } catch {
    // The language toggle should still work when storage is unavailable.
  }
};

const i18n = {
  zh: {
    title: "Tiance - 面向 AI 产品和数字商家的跨境支付服务",
    description:
      "被算法拒绝了？Tiance 会真正审核你的业务，也会和你沟通。为 AI 开发者、SaaS 创始人和数字商家提供跨境收款服务。",
    text: {
      "Why Tiance": "为什么选择 Tiance",
      "WHY TIANCE": "为什么选择 Tiance",
      "How It Works": "如何运作",
      "HOW TIANCE WORKS": "Tiance 如何运作",
      Pricing: "定价",
      Contact: "联系",
      Apply: "申请",
      "Cross-border payment services for AI products and digital merchants":
        "面向 AI 产品和数字商家的跨境支付服务",
      "Stripe rejected your category. We understand what you sell.":
        "Stripe 拒绝了你的品类。我们会看懂你真正销售的产品。",
      "Your payment account stays stable as you scale. We don't approve first and freeze later — we review the product, business model, and customers before we approve anything.":
        "你的支付账户应该在增长中保持稳定。我们不会先放行、再冻结；在批准前，我们会先审核产品、商业模式和客户。",
      "Apply for Review →": "申请审核 →",
      "Email Us →": "给我们发邮件 →",
      "Accepted payment methods": "支持的支付方式",
      Mastercard: "万事达卡",
      Pay: "支付",
      Stablecoins: "稳定币",
      "Three things that make Tiance different.": "Tiance 与众不同的三点。",
      "An algorithm never read your product page. We do.": "算法没有读过你的产品页。我们会读。",
      "Business model, pricing, customer flow — reviewed by a real person before we make any call. Edge cases get a conversation, not a form rejection.":
        "商业模式、定价、客户流程，都会由真人在决策前审核。复杂情况会得到沟通，而不是表单式拒绝。",
      "We find the problems before they find you.": "我们在问题找上你之前，先发现问题。",
      "Risk, category fit, and edge cases — all reviewed before launch, when there's still time to fix things. Not after your revenue depends on it.":
        "风险、品类匹配、边界情况都会在上线前审核，那时还有时间调整，而不是等收入依赖它之后才处理。",
      "Same person. From approval through everything after.": "同一个人，从批准到后续全程跟进。",
      "From first review through go-live, ongoing questions, chargebacks, and disputes — the same person handles it. Not a ticket queue, not a new rep each time.":
        "从首次审核、上线，到后续问题、拒付和争议，都由同一个人跟进。不是工单队列，也不是每次换一个客服。",
      "Apply once. Live in days.": "申请一次，几天内上线。",
      "Business review, payment setup, and go-live — a defined sequence with no surprises at any stage.":
        "业务审核、支付配置、上线，每一步都有清晰流程，不会临时给你惊喜。",
      "Apply for Review": "申请审核",
      "Share your product, markets, and payment needs. A real person is available as you complete the form — and from here, you have dedicated support.":
        "告诉我们你的产品、市场和收款需求。填写表单时会有真人协助，从这一步开始，你就有专属支持。",
      "~5 min": "约 5 分钟",
      "Apply →": "申请 →",
      "Business Review": "业务审核",
      "A real person reviews your product, customers, region, and risk profile — not just the category code.":
        "真人会审核你的产品、客户、地区和风险画像，而不只是看一个品类代码。",
      "1 day": "1 天",
      "Payment Setup": "支付配置",
      "Your API keys, installation SKU, and test and live accounts are released — with setup instructions to get your checkout or integration live quickly.":
        "我们会释放 API 密钥、安装 SKU、测试和正式账户，并提供配置说明，帮助你快速上线结账或集成。",
      "15 minutes": "15 分钟",
      "Go Live With Support": "在支持下上线",
      "Your account is active. The same team stays available for questions, disputes, and anything that comes up.":
        "账户启用后，同一个团队会继续处理你的问题、争议和任何后续情况。",
      Instant: "即时",
      "Not ready to apply? Talk to us first.": "还没准备好申请？先和我们聊聊。",
      "Reach out on Telegram or Discord — before you apply, during review, or anytime after you're live.":
        "你可以在申请前、审核中或上线后，通过 Telegram 或 Discord 联系我们。",
      Telegram: "Telegram",
      Discord: "Discord",
      CAPABILITIES: "能力",
      "From first payment to final settlement.": "从第一笔付款到最终结算。",
      "Everything you need to collect internationally, protect your account, and get paid — without stitching together multiple providers.":
        "跨境收款、账户保护、资金到账所需能力都在这里，无需拼接多个服务商。",
      "AI usage billing": "AI 用量计费",
      "Credit-based, top-up, and recurring billing for AI tools, SaaS products, and digital access — covering usage credits, prepaid access, and subscription models.":
        "为 AI 工具、SaaS 产品和数字访问提供积分制、充值制和订阅制计费，覆盖用量积分、预付访问和订阅模型。",
      "Community payments": "社群内支付",
      "Accept payments directly inside Telegram, Discord, or WhatsApp — no redirects, no broken checkout flow.":
        "直接在 Telegram、Discord 或 WhatsApp 内收款，无需跳转，也不会打断结账流程。",
      "Checkout and API": "结账页与 API",
      "Hosted checkout, payment links, WooCommerce, Shopify, or REST API — connect to your stack without rebuilding it.":
        "托管结账页、支付链接、WooCommerce、Shopify 或 REST API，可接入现有技术栈，无需重建。",
      "Chargeback alerts": "拒付预警",
      "Early visibility on transactions at risk of dispute — before they become formal chargebacks.":
        "在交易演变成正式拒付前，提前看到可能产生争议的风险。",
      "Advance notice on account changes": "账户变更提前通知",
      "If your account status needs to change, we reach out before it happens — not after. A person calls, not an automated notification.":
        "如果账户状态需要变更，我们会在发生前联系你，而不是事后通知。是真人沟通，不是自动消息。",
      "Multi-currency settlement": "多币种结算",
      "Accept in USD, EUR, GBP, and 20+ currencies including crypto and stablecoins. Funds settle within 7 days of clearance.":
        "支持美元、欧元、英镑及 20 多种货币，包括加密货币和稳定币。资金在清算后 7 天内结算。",
      "BEST FIT": "适合对象",
      "Built for merchants standard payment processors misunderstand.":
        "为被标准支付处理器误解的商户而建。",
      "Tiance is designed for AI developers, SaaS founders, digital product sellers, community merchants, and cross-border businesses that need payment collection but do not fit a simple category code. If Stripe, Creem, Paddle, or another processor rejected your product without a real review, we look at the actual product, customer flow, pricing, refund policy, delivery model, and risk profile before making a decision.":
        "Tiance 面向 AI 开发者、SaaS 创始人、数字产品卖家、社群商户和跨境业务。它们需要跨境收款，却往往无法被简单品类代码准确描述。如果 Stripe、Creem、Paddle 或其他支付处理器没有真正审核产品就拒绝你，我们会看实际产品、客户流程、定价、退款政策、交付模式和风险画像，再做判断。",
      "That upfront review is the difference. We check your website, checkout journey, markets, expected transaction volume, payment methods, customer support process, and dispute exposure before the account goes live. The goal is stable cross-border payment access, fewer surprise account changes, and clearer communication about what needs to be fixed before revenue depends on the channel.":
        "前置审核是关键差异。账户上线前，我们会检查你的网站、结账路径、市场、预期交易量、支付方式、客户支持流程和争议风险。目标是更稳定的跨境支付接入、更少突然的账户变更，以及在收入依赖通道前就说清楚需要修正的地方。",
      "After approval, Tiance supports hosted checkout, payment links, WooCommerce, Shopify, REST API integration, AI usage billing, community payments, multi-currency settlement, chargeback alerts, and ongoing merchant account questions. You work with a real operator from application through go-live, settlement, disputes, and account changes.":
        "获批后，Tiance 支持托管结账页、支付链接、WooCommerce、Shopify、REST API 集成、AI 用量计费、社群内支付、多币种结算、拒付预警和持续商户账户问题处理。从申请、上线、结算、争议到账户变更，你都和真人运营人员沟通。",
      "Common use cases include AI image tools, AI writing products, developer utilities, paid Discord or Telegram communities, digital templates, global SaaS subscriptions, and merchants selling to customers across multiple regions.":
        "常见场景包括 AI 图像工具、AI 写作产品、开发者工具、付费 Discord 或 Telegram 社群、数字模板、全球 SaaS 订阅，以及面向多个地区客户销售的商户。",
      "For searchers comparing payment processors for AI products, SaaS, digital downloads, paid communities, and global merchants, Tiance is not a self-serve payment gateway. It is a reviewed payment integration and merchant support service for businesses that need human context before approval and human support after launch.":
        "对正在比较 AI 产品、SaaS、数字下载、付费社群和全球商户支付处理方案的人来说，Tiance 不是自助式支付网关，而是带审核的支付集成与商户支持服务：批准前需要真人理解业务，上线后也需要真人持续支持。",
      PRICING: "定价",
      "How pricing works.": "定价如何计算。",
      "Most approved merchants pay between 8% and 15% per transaction, with no setup fee. Your exact rate depends on product category, transaction volume, and payment channel — and is confirmed in writing before activation. A rolling reserve is standard on all accounts. Funds settle T+7 from clearance. Payout currency options are confirmed at onboarding.":
        "大多数获批商户每笔交易费率为 8% 到 15%，无开户费。你的具体费率取决于产品品类、交易量和支付通道，并会在启用前以书面形式确认。所有账户通常设有滚动保证金。资金自清算起 T+7 结算。打款币种会在入驻时确认。",
      "Request a pricing estimate →": "申请费率预估 →",
      "Why Tiance exists.": "Tiance 为什么存在。",
      "We built these channels as operators, not as a startup. For years, we ran cross-border businesses — and the payment infrastructure we rely on today started as our own internal stack, built because we needed it to actually work.":
        "我们是以运营者的身份搭建这些通道，而不是从创业故事开始。多年来，我们自己经营跨境业务，今天所依赖的支付基础设施，最初就是为了让自己的业务真正跑起来而搭建的内部系统。",
      "When the AI boom took off, we watched developer friends run into a wall we already knew. Products rejected. Accounts frozen. No conversation, no appeal. They were building legitimate businesses that mainstream gateways couldn't categorise.":
        "当 AI 浪潮兴起时，我们看到开发者朋友撞上了我们熟悉的墙：产品被拒、账户被冻结、没有沟通、没有申诉。他们在做合规业务，只是主流网关无法正确归类。",
      "We already had the channels. We opened them up.": "我们已经有这些通道，所以把它们开放出来。",
      "That's what Tiance is: a payment integration and service provider, built by operators — connecting AI and digital businesses with suitable payment channels after upfront review.":
        "这就是 Tiance：由运营者搭建的支付集成与服务提供方，在前置审核后，把 AI 与数字业务连接到合适的支付通道。",
      "Payments processed by our licensed payment service partners. Merchant approvals reflect their requirements as well as ours.":
        "支付由我们的持牌支付服务伙伴处理。商户审批同时遵循他们的要求和我们的要求。",
      "— The Tiance founding team": "- Tiance 创始团队",
      "Talk to Tiance": "联系 Tiance",
      "Stripe and Creem are built for standard categories.": "Stripe 和 Creem 更适合标准品类。",
      "Doesn't fit? Let's actually look at your business.": "不匹配？那就让我们真正看看你的业务。",
      "Talk to Us on Discord →": "在 Discord 上联系我们 →",
      "Here's why merchants choose Tiance": "商户为什么选择 Tiance",
      "★★★★★": "★★★★★",
      "\"We got rejected by Stripe and Creem before Tiance. They actually looked at our product, discussed our business, and approved us in a week.\"":
        "\"在找到 Tiance 之前，我们被 Stripe 和 Creem 拒绝过。他们真的看了我们的产品，讨论了我们的业务，并在一周内批准了我们。\"",
      "Kevin Zhang": "Kevin Zhang",
      "AI Web Founder": "AI Web 创始人",
      Singapore: "新加坡",
      Live: "已上线",
      "\"The review wasn't a wall — it was a conversation. They asked questions, we explained, and it worked.\"":
        "\"审核不是一道墙，而是一场对话。他们提问，我们解释，然后就跑通了。\"",
      "Maria Santos": "Maria Santos",
      "SaaS Founder": "SaaS 创始人",
      Spain: "西班牙",
      "\"We run fan spaces on Telegram and Discord. With Tiance's payment features built in, we do community payments directly — seamless experience, better retention and repeat purchases.\"":
        "\"我们在 Telegram 和 Discord 上运营粉丝社群。接入 Tiance 的支付能力后，我们可以直接做社群内支付，体验顺畅，留存和复购都更好。\"",
      "Marcus Webb": "Marcus Webb",
      "Community Seller": "社群卖家",
      "United States": "美国",
      "\"Other platforms froze our account with no notice — shut down after six months. Tiance reviewed us before we went live, and we've been in close communication throughout.\"":
        "\"其他平台没有提前通知就冻结了我们的账户，六个月后直接停掉。Tiance 在上线前就审核了我们，而且整个过程中都保持密切沟通。\"",
      "Anna Petrova": "Anna Petrova",
      "Digital Products": "数字产品",
      Germany: "德国",
      "\"Paddle rejected our image generation tool at launch — policy update, no conversation. Tiance reviewed our product directly and had us live in four days.\"":
        "\"Paddle 在我们上线时拒绝了我们的图像生成工具，说是政策更新，没有沟通。Tiance 直接审核了我们的产品，四天就让我们上线了。\"",
      "Daniel Kim": "Daniel Kim",
      "AI Developer": "AI 开发者",
      "South Korea": "韩国",
      "Apply in 5 minutes - We get your stable payment collection ready within 2 days.":
        "5 分钟申请，我们在 2 天内帮你准备好稳定收款。",
      Products: "产品",
      "Hosted Checkout": "托管结账页",
      "Payment Links": "支付链接",
      WooCommerce: "WooCommerce",
      "API Integration": "API 集成",
      "Settlement & Reporting": "结算与报表",
      Solutions: "解决方案",
      "AI Web": "AI Web",
      "SaaS & Digital Products": "SaaS 与数字产品",
      "Community Sellers": "社群卖家",
      "Cross-Border Merchants": "跨境商户",
      Company: "公司",
      Developers: "开发者",
      "Compliance Center": "合规中心",
      "© 2026 Tiance. All rights reserved.": "© 2026 Tiance. 保留所有权利。",
      Terms: "条款",
      Privacy: "隐私",
      AUP: "可接受使用政策",
      "Tiance is a brand of United Tycoon Group Limited, Hong Kong. Tiance provides payment integration and merchant support services. Payments are processed by our licensed payment service partners; approvals are subject to their requirements as well as ours.":
        "Tiance 是香港 United Tycoon Group Limited 旗下品牌。Tiance 提供支付集成和商户支持服务。支付由我们的持牌支付服务伙伴处理；审批需同时满足他们的要求和我们的要求。",
    },
    attributes: {
      "Primary navigation": "主导航",
      Tiance: "Tiance",
      "Open navigation menu": "打开导航菜单",
      "Close navigation menu": "关闭导航菜单",
      "Switch to Chinese": "切换到中文",
      "Switch to English": "切换到英文",
      "Contact Tiance": "联系 Tiance",
      "Product interface preview": "产品界面预览",
      "Tiance internal home dashboard": "Tiance 内部首页仪表盘",
      "Accepted payment methods": "支持的支付方式",
      Visa: "Visa",
      Mastercard: "万事达卡",
      "Apple Pay": "Apple Pay",
      "Google Pay": "Google Pay",
      "WeChat Pay": "微信支付",
      Alipay: "支付宝",
      "Crypto and Stablecoins": "加密货币和稳定币",
      "A founder reviewing a product page on a laptop": "创始人在笔记本电脑上审核产品页面",
      "Two reviewers discussing risk notes on a whiteboard": "两位审核人员在白板前讨论风险备注",
      "A reviewer staying with a merchant through ongoing support": "审核人员持续为商户提供支持",
      "Tiance review and setup workflow": "Tiance 审核与配置流程",
      "Human support contact channels": "人工支持联系方式",
      "Contact Tiance on Telegram": "通过 Telegram 联系 Tiance",
      "Contact Tiance on Discord": "通过 Discord 联系 Tiance",
      "Two people reviewing a payment application together on a laptop": "两个人在笔记本电脑上共同审核支付申请",
      "Live operations dashboard preview": "实时运营仪表盘预览",
      "Transactions dashboard with filters, export controls, and recent payments":
        "包含筛选、导出控制和最近付款的交易仪表盘",
      "Tiance capabilities": "Tiance 能力",
      "Two Tiance operators working together in a bright office": "两位 Tiance 运营人员在明亮办公室协作",
      "Apply or talk to Tiance": "申请或联系 Tiance",
      "5 star rating": "五星评价",
    },
  },
};

const normalizeI18nKey = (value) => value.trim().replace(/\s+/g, " ");
const getTranslationsForLocale = (locale) => i18n[locale] || {};
const getTranslation = (locale, value, type = "text") => {
  const key = normalizeI18nKey(value);
  return getTranslationsForLocale(locale)[type]?.[key];
};

const withOriginalWhitespace = (original, translated) => {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
};

const getOriginalAttribute = (element, attribute) => {
  let attributes = originalAttributes.get(element);
  if (!attributes) {
    attributes = new Map();
    originalAttributes.set(element, attributes);
  }
  if (!attributes.has(attribute)) {
    attributes.set(attribute, element.getAttribute(attribute) || "");
  }
  return attributes.get(attribute);
};

const updateLanguageControls = (locale) => {
  languageToggleButtons.forEach((button) => {
    button.setAttribute("aria-pressed", locale === "zh" ? "true" : "false");
    button.setAttribute("aria-label", locale === "zh" ? "切换到英文" : "Switch to Chinese");
    const label = button.querySelector("[data-language-toggle-label]") || button;
    label.textContent = locale === "zh" ? "EN" : "中文";
  });
};

const translatePage = (locale) => {
  activeLocale = locale;
  const translationBundle = getTranslationsForLocale(locale);
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  document.body.dataset.locale = locale;

  document.title = locale === "zh" ? translationBundle.title : document.querySelector("title")?.dataset.originalTitle || document.title;
  const titleNode = document.querySelector("title");
  if (titleNode && !titleNode.dataset.originalTitle) {
    titleNode.dataset.originalTitle = titleNode.textContent || "";
  }

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    if (!description.dataset.originalContent) {
      description.dataset.originalContent = description.getAttribute("content") || "";
    }
    description.setAttribute("content", locale === "zh" ? translationBundle.description : description.dataset.originalContent);
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return normalizeI18nKey(node.nodeValue || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    if (!originalTextNodes.has(node)) {
      originalTextNodes.set(node, node.nodeValue || "");
    }
    const original = originalTextNodes.get(node);
    const translated = locale === "zh" ? getTranslation(locale, original, "text") : undefined;
    node.nodeValue = translated ? withOriginalWhitespace(original, translated) : original;
  });

  document.querySelectorAll("[aria-label], [alt], [title], [placeholder]").forEach((element) => {
    ["aria-label", "alt", "title", "placeholder"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) {
        return;
      }
      const original = getOriginalAttribute(element, attribute);
      const translated = locale === "zh" ? getTranslation(locale, original, "attributes") : undefined;
      element.setAttribute(attribute, translated || original);
    });
  });

  updateLanguageControls(locale);
  setSavedLocale(locale);
};

document.querySelector("title")?.setAttribute("data-original-title", document.title);

languageToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    translatePage(activeLocale === "zh" ? "en" : "zh");
  });
});

const savedLocale = getSavedLocale();
translatePage(savedLocale === "zh" ? "zh" : "en");

const requestTypeByCta = {
  review: "Review Application",
  general: "General Application",
  pricing: "Pricing Estimate",
};

const sourceByCta = {
  hero: "Hero Apply for Review",
  workflow: "Workflow Apply",
  pricing: "Pricing Estimate",
  footer: "Footer Apply for Review",
};

const applicationFormUrl = window.TIANCE_APPLICATION_FORM_URL;

if (applicationFormUrl) {
  applicationCtas.forEach((cta) => {
    const requestType = requestTypeByCta[cta.dataset.applicationCta];
    const sourceCta = sourceByCta[cta.dataset.applicationSource];

    try {
      const url = new URL(applicationFormUrl, window.location.href);
      if (requestType) {
        url.searchParams.set("request_type", requestType);
      }
      if (sourceCta) {
        url.searchParams.set("source_cta", sourceCta);
      }
      url.searchParams.set("source_url", window.location.href);
      cta.href = url.toString();
    } catch {
      cta.href = applicationFormUrl;
    }
  });
}

contactTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeTab = button.dataset.contactTab;

    contactTabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    contactPanels.forEach((panel) => {
      const isActive = panel.dataset.contactPanel === activeTab;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

const openContactTab = (activeTab) => {
  const targetButton = document.querySelector(`[data-contact-tab="${activeTab}"]`);

  if (!targetButton) {
    return;
  }

  contactTabButtons.forEach((item) => {
    const isActive = item === targetButton;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  contactPanels.forEach((panel) => {
    const isActive = panel.dataset.contactPanel === activeTab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

if (window.location.hash === "#apply") {
  openContactTab("apply");
}

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#apply") {
    openContactTab("apply");
  }
});

const copyText = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

contactCopyButtons.forEach((button) => {
  const defaultLabel = button.getAttribute("aria-label") || "Copy";

  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    if (!value) {
      return;
    }

    try {
      await copyText(value);
      button.classList.add("is-copied");
      button.setAttribute("aria-label", "Copied");
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", defaultLabel);
      }, 1400);
    } catch {
      button.setAttribute("aria-label", "Copy failed");
      window.setTimeout(() => {
        button.setAttribute("aria-label", defaultLabel);
      }, 1400);
    }
  });
});

const getContactFieldLabel = (field) => field.closest("label")?.querySelector("span")?.textContent?.trim() || "This field";

const getContactFieldError = (field) => {
  if (field.validity.valueMissing) {
    return `${getContactFieldLabel(field)} is required.`;
  }

  if (field.validity.typeMismatch) {
    return "Enter a valid email address.";
  }

  return "";
};

const clearContactFieldError = (field) => {
  const label = field.closest("label");
  const error = label?.querySelector(".field-error-popover");
  label?.classList.remove("has-field-error");
  error?.remove();
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
};

const showContactFieldError = (field, message) => {
  const label = field.closest("label");

  if (!label) {
    return;
  }

  const fieldKey = field.name || field.id || "field";
  const errorId = `contact-${fieldKey}-error`;
  let error = label.querySelector(".field-error-popover");

  if (!error) {
    error = document.createElement("span");
    error.className = "field-error-popover";
    error.id = errorId;
    error.setAttribute("role", "status");
    label.append(error);
  }

  label.classList.add("has-field-error");
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", errorId);
  error.textContent = message;
};

const validateContactForm = () => {
  const fields = Array.from(contactForm?.querySelectorAll("input[required], textarea[required]") || []);
  let firstInvalidField;

  fields.forEach((field) => {
    const message = getContactFieldError(field);

    if (message) {
      showContactFieldError(field, message);
      firstInvalidField ||= field;
    } else {
      clearContactFieldError(field);
    }
  });

  if (firstInvalidField) {
    firstInvalidField.scrollIntoView({ block: "center", behavior: "smooth" });
    firstInvalidField.focus({ preventScroll: true });
    return false;
  }

  return true;
};

contactForm?.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      const message = getContactFieldError(field);
      if (message) {
        showContactFieldError(field, message);
      } else {
        clearContactFieldError(field);
      }
    }
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateContactForm()) {
    if (contactStatus) {
      contactStatus.textContent = "";
    }
    return;
  }

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());
  const endpoint = window.TIANCE_CONTACT_ENDPOINT || "/api/contact";

  if (contactStatus) {
    contactStatus.textContent = "Preparing your message...";
  }

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      contactForm.reset();
      contactForm.querySelectorAll("input, textarea").forEach(clearContactFieldError);
      if (contactStatus) {
        contactStatus.textContent = "Message sent. We'll follow up by email.";
      }
      return;
    } catch {
      if (contactStatus) {
        contactStatus.textContent = "Direct send is unavailable. Opening your email app instead.";
      }
    }
  }

  const subject = encodeURIComponent(`TIANCE contact request from ${payload.company || payload.name || "website"}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name || ""}`,
      `Company: ${payload.company || ""}`,
      `Business type: ${payload.companyType || ""}`,
      `Email: ${payload.email || ""}`,
      `Phone: ${payload.phone || ""}`,
      "",
      payload.message || "",
    ].join("\n")
  );
  window.location.href = `mailto:hello@tiance.io?subject=${subject}&body=${body}`;
});

if (applicationFormUrl && applicationModalBody) {
  applicationModalBody.replaceChildren();
  const applicationIframe = document.createElement("iframe");
  applicationIframe.title = "TIANCE Merchant Application";
  applicationIframe.src = applicationFormUrl;
  applicationModalBody.append(applicationIframe);
}

applicationModalOpen?.addEventListener("click", () => {
  if (typeof applicationModal?.showModal === "function") {
    applicationModal.showModal();
  }
});

applicationModalClose?.addEventListener("click", () => {
  applicationModal?.close();
});

applicationModal?.addEventListener("click", (event) => {
  if (event.target === applicationModal) {
    applicationModal.close();
  }
});

window.addEventListener("scroll", () => {
  nav?.classList.toggle("is-scrolled", window.scrollY > 20);
});

const setMobileMenu = (isOpen) => {
  nav?.classList.toggle("is-menu-open", isOpen);
  if (mobileNavDisclosure) {
    mobileNavDisclosure.open = isOpen;
  }
  const label = isOpen
    ? activeLocale === "zh"
      ? "关闭导航菜单"
      : "Close navigation menu"
    : activeLocale === "zh"
      ? "打开导航菜单"
      : "Open navigation menu";
  navMenuToggle?.setAttribute("aria-label", label);
};

mobileNavDisclosure?.addEventListener("toggle", () => {
  const isOpen = mobileNavDisclosure.open;
  nav?.classList.toggle("is-menu-open", isOpen);
  const label = isOpen
    ? activeLocale === "zh"
      ? "关闭导航菜单"
      : "Close navigation menu"
    : activeLocale === "zh"
      ? "打开导航菜单"
      : "Open navigation menu";
  navMenuToggle?.setAttribute("aria-label", label);
});

mobileNavMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMobileMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMobileMenu(false);
  }
});

document.addEventListener("click", (event) => {
  if (nav && !nav.contains(event.target)) {
    setMobileMenu(false);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px 28% 0px", threshold: 0.01 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
  if (item.getBoundingClientRect().top < window.innerHeight * 1.25) {
    item.classList.add("is-visible");
  } else {
    revealObserver.observe(item);
  }
});

videoButton?.addEventListener("click", () => {
  videoButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.97)" },
      { transform: "scale(1)" },
    ],
    { duration: 220, easing: "ease-out" }
  );
});

if (testimonialTrack && !testimonialTrack.dataset.cloned) {
  const testimonialCards = Array.from(testimonialTrack.children);
  testimonialCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    testimonialTrack.append(clone);
  });
  testimonialTrack.dataset.cloned = "true";
}
