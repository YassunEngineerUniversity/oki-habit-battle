json.array! @stamps do |stamp|
  json.id stamp.id
  json.image_url stamp.image_url
  json.obtained stamp.obtained
  json.generated_date stamp.generated_date
end