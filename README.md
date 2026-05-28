# Kavish Borse — Cloud Portfolio
> Static portfolio hosted on AWS S3 + CloudFront (HTTPS)  
> Task 1 — Cloud Computing & DevOps | Maincrafts Technology

---

## 🌐 Live URL
```
https://d27k7s0oh0rx7g.cloudfront.net/
```

---

## 📁 Project Structure
```
portfolio/
├── index.html       # Main single-page portfolio
├── styles.css       # All styles (custom properties, responsive layout)
├── main.js          # Scroll nav, burger menu, reveal-on-scroll
└── kavish_photo.png # Profile photo asset
```

---

## 🛠️ Steps Taken

### 1. Build the Portfolio Locally
- Created `index.html`, `styles.css`, and `main.js` from scratch.
- Used **Google Fonts** (Fraunces + Nunito) and **FontAwesome 6.5** for icons.
- Portfolio includes: Hero, About/What I Do, Skills, Projects (3 cards), Contact, Footer.
- Tested locally by opening `index.html` in the browser.

---

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/KavishBorse/KavishBorse_Portfolio.git
git push -u origin main
```
GitHub repo: `https://github.com/KavishBorse/KavishBorse_Portfolio
`

---

### 3. Create S3 Bucket
1. Opened **AWS Console → S3 → Create Bucket**
2. Bucket name: `kavishborse-portfolio`
3. Region: `ap-south-1` (Mumbai)
4. **Unchecked** "Block all public access" (required for static hosting)
5. Enabled **Static Website Hosting** under bucket Properties:
   - Index document: `index.html`
   - Error document: `index.html`

---

### 4. Apply Bucket Policy (Public Read)
Added the following bucket policy under **Permissions → Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::kavishborse-portfolio/*"
    }
  ]
}
```
Applied via console, or with CLI:
```bash
aws s3api put-bucket-policy \
  --bucket kavishborse-portfolio \
  --policy file://policy.json
```

---

### 5. Upload Site Files to S3
Using AWS CLI (sync command):
```bash
aws s3 sync . s3://kavishborse-portfolio --acl public-read \
  --exclude ".git/*" --exclude "*.json"
```
Or manually uploaded via the AWS Console (S3 → Upload).

**Tested the S3 endpoint:**
```
http://kavishborse-portfolio.s3-website.ap-south-1.amazonaws.com
```

---

### 6. Create CloudFront Distribution (HTTPS)
1. Opened **AWS Console → CloudFront → Create Distribution**
2. **Origin domain**: selected the S3 bucket website endpoint
3. **Viewer Protocol Policy**: `Redirect HTTP to HTTPS`
4. **Minimum TLS version**: TLSv1.2
5. **Default root object**: `index.html`
6. Deployed distribution — waited ~5–10 minutes for propagation

**CloudFront domain:**
```
https://d27k7s0oh0rx7g.cloudfront.net/
```

---

### 7. IAM — Least Privilege (Security Best Practice)
Created a dedicated IAM user `portfolio-deployer` with only the required S3 permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::kavishborse-portfolio",
        "arn:aws:s3:::kavishborse-portfolio/*"
      ]
    }
  ]
}
```
Used this user's credentials for CLI access instead of root account.

---

### 8. (Optional) Custom Domain via Route 53
> *Skip this step if not using a custom domain.*
1. Register or import domain in **Route 53**
2. Request SSL certificate via **ACM** (AWS Certificate Manager) — `us-east-1` region required for CloudFront
3. Attach the certificate to the CloudFront distribution
4. Add a **CNAME / A (Alias)** record in Route 53 pointing to the CloudFront domain

---

### 9. Verify Live Site
- Opened the CloudFront URL in browser
- Confirmed HTTPS padlock is present
- Checked all sections: Hero, About, Skills, Projects, Contact
- Tested mobile responsiveness

---

## ✅ Deliverables Checklist
| # | Deliverable | Status |
|---|---|---|
| 1 | `index.html`, `styles.css`, `main.js` on GitHub | ✅ |
| 2 | CloudFront HTTPS URL + screenshot of distribution & bucket policy | ✅ |
| 3 | This README | ✅ |
| 4 | (Optional) 60–90s screen recording | ⬜ |

---

## 🔗 Resources Used
- [AWS S3 Static Website Hosting Docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [AWS Free Tier](https://aws.amazon.com/free/)

---

## 🧰 Tech Stack
`HTML5` · `CSS3` · `JavaScript` · `AWS S3` · `AWS CloudFront` · `IAM` · `Google Fonts` · `FontAwesome`

---

*Built by Kavish Borse — BTech CSE, MIT ADT University, Pune*