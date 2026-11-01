F=components/AffiliateBox.tsx

# 1. See every affected line first
grep -n "entity-\|canonical_name\|【\|rammarly" $F

# 2. Quoted values (type union, comparisons, object keys) become lowercase 'grammarly'
perl -CSD -pi -e "s/(['\"])【entity-[^¦]*¦canonical_name=[^】]*】\1/\1grammarly\1/g" $F

# 3. Any remaining garbage inside display text becomes the plain brand name
perl -CSD -pi -e 's/【entity-[^¦]*¦canonical_name=([^】]*)】/$1/g' $F

# 4. Confirm
grep -n "entity-\|canonical_name\|【" $F   # must print nothing
grep -n "grammarly\|Grammarly" $F
