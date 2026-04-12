# Cadence — Final MVP Scope & Go-to-Market Plan
*Updated: 2026-04-12 | Clipboard-first, cross-platform, real-time coaching model*

---

## The One-Sentence Product

**Cadence is an AI communication coach one tap away from any conversation — it learns how you talk and helps you say the right thing, instantly.**

---

## Problem Statement

Millions of people freeze in digital conversations daily. They stare at messages. They overthink every reply. They get called "dry texters." They accidentally start conflicts because tone doesn't translate to text. They avoid replying entirely because the pressure is paralyzing.

Existing AI texting tools force you to leave your conversation, open a separate app, upload a screenshot, wait for suggestions, copy them, and go back. By the time you've done all that, the moment has passed. The tools that are supposed to reduce texting anxiety create a whole new kind of friction.

Cadence eliminates that friction. Copy the message. Tap the widget. Get suggestions in your voice. Tap to copy. You're back in the conversation in six seconds.

---

## Target Users

### Phase 1 Beachhead: Socially Anxious Texters (18-28)

People who identify with:
- "I'm a dry texter and I know it"
- "I never know what to say"
- "I overthink every message before sending"
- "I'm way better in person than over text"
- "My friends say I take forever to reply"

**Why them first:** The pain is emotional, daily, and identity-level. 1.2M+ members across r/socialanxiety, r/introvert, and r/socialskills. They'll try anything that reduces the anxiety of texting.

### Phase 2 Expansion (months 3-6):
- Non-native English speakers navigating social/professional conversations
- Professionals struggling with Slack, LinkedIn DM, and email tone
- Dating app users (they'll find you organically)
- Teenagers anxious about group chats and social media replies

---

## Core Product Loop

```
1. User is in ANY messaging app — WhatsApp, iMessage, Instagram, Slack, whatever
2. They receive a message they're stuck on
3. They long-press and COPY the message (1 second)
4. They tap the Cadence home screen widget (1 second)
5. Cadence auto-detects clipboard content and displays:
   "Someone said: [message]. What's your goal?"
6. User taps an intent: funny / supportive / direct / keep it going /
   change subject / apologize / set a boundary / flirty
7. AI generates 3 reply suggestions — in the user's personal voice
8. User taps their favorite → it's copied to clipboard + Cadence auto-navigates
   back to the previous app
9. User pastes and sends

TOTAL TIME: ~6 seconds
WORKS ON: Every Android phone, every iPhone. Zero OS hacks needed.
```

### Why This Beats Every Competitor

| Step | Competitors (screenshot model) | Cadence (clipboard model) |
|------|-------------------------------|--------------------------|
| Capture context | Open camera, screenshot, crop, upload | Long-press → Copy (1 sec) |
| Get to the tool | Open separate app, wait for load, navigate | Tap home screen widget (1 sec) |
| Provide context | OCR processing, sometimes fails | Clipboard auto-detected, instant |
| Get suggestions | Wait 3-5 seconds for AI | Wait 2-3 seconds for AI |
| Use the suggestion | Copy text, switch apps, paste | One tap: copies + auto-switches back |
| **Total flow** | **30-45 seconds, 8+ steps** | **~6 seconds, 3-4 steps** |

---

## Technical Architecture

### Why Clipboard-First Wins

The original vision was a real-time overlay using Android accessibility APIs. The problem: manufacturer fragmentation (Samsung, Xiaomi, Huawei all aggressively kill background services), tightening Google policies on accessibility API usage, scary permission prompts that kill adoption, and a debugging nightmare across hundreds of device variants.

Clipboard detection avoids all of this:
- Works identically on every Android phone and every iPhone
- No accessibility permissions, no overlay permissions, no manufacturer-specific hacks
- Android allows clipboard reading when the app is in foreground (standard API)
- iOS allows clipboard reading with a one-time user permission prompt (standard API)
- Zero fragmentation risk
- Clean privacy story: "We only see what you explicitly copy"

### Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Mobile app | React Native (Expo) | Cross-platform from day one. One codebase, both app stores. Expo simplifies widget development. |
| Backend | Supabase | Auth, database, edge functions. Zero config, generous free tier. |
| AI | Claude API (Sonnet) | Best at tone/nuance, fast response time, affordable per-call cost. |
| Payments | RevenueCat + Stripe | RevenueCat handles iOS/Android subscription management. Stripe for web fallback. |
| Analytics | PostHog | Free tier, funnel tracking, feature flags. |
| Hosting | Vercel (web) + Supabase (API) | Standard, cheap, reliable. |

### Platform-Specific Features

**Android:**
- Home screen widget (1x1 or 2x1): tap to open Cadence with clipboard pre-loaded
- Quick Settings tile: pull down notification shade → tap Cadence tile
- Share sheet target: highlight text in any app → Share → Cadence
- "Back" navigation after copy automatically returns to previous app

**iOS:**
- Lock screen widget / home screen widget: tap to open with clipboard
- Share sheet extension: select text → Share → Cadence
- Shortcuts integration: "Hey Siri, help me reply" → opens Cadence with clipboard
- Action button mapping (iPhone 15 Pro+): physical button → Cadence

**Web (fallback/demo):**
- Paste-based interface on cadence.ai
- Used for landing page demo, desktop users, and as marketing tool
- Not the primary product — the mobile app is

---

## MVP Feature Set

### Week 1-2: Core App (Both Platforms)

**The essential loop:**
- App opens → checks clipboard → if text detected, displays it with "Someone said: [message]"
- If no clipboard content, shows paste input field as fallback
- Intent selector grid: 8 options (funny, supportive, direct, keep it going, change subject, apologize, set a boundary, flirty)
- AI generates 3 reply suggestions with different approaches
- Each suggestion shows a subtle tone label ("playful," "warm," "confident")
- One-tap copy: copies suggestion to clipboard
- Auto-navigate back to previous app (Android: finish() activity, iOS: URL scheme fallback)
- Simple auth: email magic link
- Stripe/RevenueCat subscription

**Voice calibration onboarding (30 seconds):**
- "How do you usually text?" → casual / mixed / formal
- "Do you use emojis?" → lots / sometimes / never
- "Your humor style?" → dry/sarcastic / goofy / witty / not really funny
- "Message length?" → short and punchy / medium / I write paragraphs
- "How do you start messages?" → hey / no greeting, just dive in / depends

This seeds the AI's personality model from minute one. Not perfect, but immediately better than generic.

**Home screen widget:**
- 1x1 widget: Cadence icon, tap to open with clipboard
- Shows subtle status: "Ready" or "15 replies left today"

**Free tier:** 15 replies/day
**Pro:** $6.99/mo or $49.99/yr — unlimited replies, all intent options, personality learning

### Week 3-4: Polish + Share Sheet

- Share sheet integration (both platforms)
- Android Quick Settings tile
- Passive style learning: track which suggestions users pick. After 20+ selections, AI begins adapting to preference patterns automatically.
- Conversation threading: Cadence remembers context. If you used it 5 minutes ago for the same conversation, it knows the backstory. Stored locally on device for privacy.
- Haptic feedback on suggestion tap (subtle confidence reinforcement)
- Onboarding tutorial: 3-screen walkthrough showing copy → tap → done

### Week 5-8: Retention + Growth Features

- **Conversation memory:** Cadence remembers past conversations per contact (opt-in, stored locally). "Last time you talked to this person, you were making plans to meet up."
- **Style evolution:** AI progressively learns from every interaction. After 50+ uses, suggestions are noticeably personalized.
- **"What worked" insights:** Optional post-conversation check-in. "Did that reply land?" → thumbs up/down. Feeds back into the AI model.
- **Quick replies:** User can save favorite suggestion templates. "When someone says 'wyd', I usually want something like..."
- **Referral program:** "Give a friend 30 free replies, get a free week of Pro."

### Defer (Month 3+):

- ❌ Keyboard extension (fragmentation risk, privacy pushback — revisit when user base justifies the engineering cost)
- ❌ Accessibility overlay (same — too fragile across devices)
- ❌ Screenshot OCR (unnecessary with clipboard flow)
- ❌ Profile optimization / dating-specific features (stay general-purpose)
- ❌ Desktop app (mobile is the primary use case)
- ❌ Multi-language support (English-first, expand with demand)

---

## Personality Learning Roadmap

This is Cadence's moat. Build it in layers:

**V1 (MVP — Week 1-2):** Onboarding questionnaire seeds the AI with style preferences. 5 questions, 30 seconds. Immediately makes suggestions feel less generic than every competitor.

**V2 (Week 3-4):** Track which suggestions users pick vs. skip. The AI learns patterns passively — "this user always picks the shorter option," "this user never uses emojis," "this user prefers humor over sincerity." No user effort required.

**V3 (Month 2-3):** Optional "teach me your style" feature — user pastes 10-20 of their own past messages and the AI extracts voice patterns: vocabulary, sentence structure, punctuation habits, emoji usage, humor style.

**V4 (Month 4+):** Context-aware personality — the AI adjusts tone based on conversation context. Texting a best friend vs. a new acquaintance vs. a work colleague should produce different suggestion styles, automatically inferred from the conversation content.

**Each version makes the product harder to leave.** By V3, Cadence knows your voice better than any new tool could. That's the retention moat no competitor has.

---

## Pricing

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | 15 replies/day, basic intent selection, style seed from onboarding |
| **Pro** | $6.99/mo ($49.99/yr) | Unlimited replies, all intents, personality learning, conversation memory, priority AI speed |

**Annual discount:** $49.99/yr = $4.17/mo (40% savings). Offer after user has been on monthly for 2+ months — don't push annual upfront.

**Why 15 free/day:** Covers 3-4 separate conversations per day. Enough to build a daily habit but not enough for power users to avoid paying. More generous than YourMove (7/day) and Piercr (3/day).

**Why $6.99/mo:** Cheapest unlimited monthly subscription in the competitive landscape. Simple, transparent, no credit systems, no hidden charges. The anti-YourMove positioning.

---

## Go-to-Market Plan

### Week 0: Validate (Before Writing Code)

**Landing page + waitlist on cadence.ai.**

Hero message:
> "Never overthink a text again."
> An AI communication coach one tap away from any conversation. Learns your voice. Suggests the right words. In 6 seconds, you're back in the chat.
> [Join the waitlist]

**Validation channels (spend $0):**

1. **Reddit (3 posts, genuine value-first):**
   - r/socialanxiety (800K+ members): "I'm building an app for people who stare at messages for 10 minutes before replying. Would this help you?"
   - r/introvert (400K+): "Fellow introverts — what if you had a communication coach that lived on your home screen?"
   - r/socialskills (2.5M+): "I realized 'dry texter' isn't a personality trait — it's a skill gap nobody teaches. So I'm building something."

2. **TikTok (2 videos):**
   - "POV: you're a dry texter and someone just sent a paragraph" → show the 6-second Cadence flow
   - "Things overthinkers do before sending a text" → relatable humor → soft product mention

3. **Twitter/X thread:**
   - "I spent 2 weeks researching every AI texting tool on the market. They all have the same problem..." → thread about the clipboard innovation → waitlist link

**Target: 200 signups in 7 days.** Below 50 = rethink positioning. Above 200 = build immediately.

### Week 1-2: Build the MVP

React Native app, both platforms, clipboard-first flow. Ship to TestFlight (iOS) and internal testing track (Android).

### Week 3: Soft Launch

- Open to waitlist
- Personal message to every signup
- Talk to first 20 users daily
- Monitor: what conversations are they using it for? What intents are most popular? What's the average time-to-suggestion?

### Week 4: Public Launch

- Submit to App Store and Google Play
- Product Hunt launch
- Reddit launch posts in target communities
- First TikTok showing real (anonymized) before/after texts

### Week 5-8: Content Engine

**Two content pillars:**

1. **"What to say when..." (SEO + TikTok)**
   - Blog posts: "What to say when someone asks 'how are you' and you want to be interesting"
   - TikTok: Before/after text comparisons, "rating texts" format, "dry texter rehabilitation"
   - This content is infinitely generatable and each piece naturally leads to the product

2. **Build in public (Twitter/X)**
   - Share growth numbers, user stories, product decisions
   - Indie hacker community amplification
   - "Day 30 of building Cadence" format

**Target: 2 TikToks/week + 2 blog posts/week + 1 Twitter thread/week**

### Month 3+: Growth Loops

- **Referral:** "Give a friend 30 free replies, get a free week of Pro"
- **SEO:** Own "how to not be a dry texter," "what to say when," "communication coach app"
- **App Store Optimization:** Target "texting help," "conversation coach," "reply suggestions" keywords. No competitor owns these.
- **Partnerships:** Social anxiety influencers, introvert content creators, communication coaches

---

## Competitive Position (Final)

| | Cadence | Every Existing Competitor |
|---|---------|--------------------------|
| **Workflow** | Copy → tap widget → suggestions → back in 6 sec | Screenshot → open app → upload → wait → copy → switch back (30-45 sec) |
| **Personality learning** | Yes (4-stage roadmap) | Nobody does this |
| **Positioning** | General communication coach | Dating-only (all of them) |
| **Conversation memory** | Yes (local, privacy-first) | Nobody does this |
| **Platform** | iOS + Android from day one | Most are iOS-only or web-only |
| **Pricing** | $6.99/mo unlimited, transparent | $7-28/mo, credits, hidden charges |
| **Privacy** | Only reads what you copy (explicit action) | Keys AI reads all keystrokes, others require screenshot access |

**You are not entering the AI dating texting assistant market. You are creating the AI communication coach category.** The clipboard-first, cross-platform, personality-learning approach has zero direct competitors.

---

## Unit Economics

| Metric | Estimate |
|--------|----------|
| Average AI cost per reply | ~$0.004 (slightly higher due to personality context) |
| Average replies per paid user/day | 20 |
| Monthly AI cost per paid user | ~$2.40 |
| Subscription revenue per paid user | $6.99 |
| **Gross margin per paid user** | **~$4.59 (66%)** |
| Free-to-paid conversion (target) | 5-8% |
| Break-even point | ~75 paid users ($524 MRR) |

---

## Success Metrics (First 60 Days)

| Metric | Target | Why |
|--------|--------|-----|
| Waitlist signups (Week 0) | 200+ | Validates positioning |
| Time-to-suggestion | <3 seconds | Core UX promise |
| Full flow time (copy to back-in-chat) | <8 seconds | Must feel instant |
| DAU/MAU ratio (Week 4+) | >30% | Daily habit forming |
| Replies per active user/day | >5 | Used across multiple conversations |
| Free-to-paid conversion | >5% | Willingness to pay |
| Day 7 retention | >40% | Users come back |
| Day 30 retention | >20% | Product has staying power |
| First revenue | Within 30 days of launch | Even $50 proves the model |

---

## Risk Register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Apple/Google restrict clipboard API access | High | Web app fallback, share sheet as primary iOS path, paste input as universal fallback |
| Users find 2-app-switch flow too much friction | Medium | Widget makes switch near-instant; measure drop-off and invest in keyboard extension if needed |
| Bumble/Tinder build native AI texting | Medium | General-purpose positioning means you're not dependent on dating platforms |
| AI suggestions still sound generic despite personality seed | Medium | V2 passive learning kicks in after 20 uses; V3 explicit style training is the real unlock |
| Low willingness to pay for general communication (vs. acute dating pain) | Medium | Generous free tier builds habit; conversion happens after users can't imagine texting without it |
| "Cadence" name is already in use by another product | Low | Search trademark databases before committing; have backup names ready |

---

## The One Goal This Week

**Landing page live on cadence.ai + 3 Reddit posts by Friday.**

Don't build the app yet. Validate that "AI communication coach, one tap away from any conversation" resonates. 200 waitlist signups = green light. Then build.
