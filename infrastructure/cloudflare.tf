resource "cloudflare_dns_record" "root" {
  zone_id = var.CLOUDFLARE_ZONE_ID
  name    = var.site_name
  proxied = true
  type    = "CNAME"
  ttl     = 1
  content = aws_s3_bucket_website_configuration.main.website_endpoint
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.CLOUDFLARE_ZONE_ID
  name    = "www"
  proxied = true
  type    = "CNAME"
  ttl     = 1
  content = aws_s3_bucket_website_configuration.www.website_endpoint
}
