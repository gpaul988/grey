#!/usr/bin/perl
use strict;
use warnings;

my $file = 'maritime-port-management.tsx';

open my $fh, '<:utf8', $file or die "Cannot open $file: $!";
my $content = do { local $/; <$fh> };
close $fh;

# All replacements
$content =~ s/ðŸ"ˆ/📈/g;
$content =~ s/ðŸ§ /🧠/g;
$content =~ s/ðŸ¢/🏢/g;
$content =~ s/â˜ï¸/☁️/g;
$content =~ s/ðŸ†/🏆/g;
$content =~ s/â­/⭐/g;
$content =~ s/ðŸ"/📋/g;
$content =~ s/ðŸŌ/🌍/g;
$content =~ s/âš™ï¸/⚙️/g;
$content =~ s/ðŸŎ¯/🎯/g;
$content =~ s/ðŸ—ï¸/🗣️/g;
$content =~ s/ðŸ"Š/📊/g;
$content =~ s/âš¡/⚡/g;
$content =~ s/ðŸ›¡ï¸/🛡️/g;
$content =~ s/âœ¨/✨/g;
$content =~ s/ðŸ'°/💰/g;
$content =~ s/â€"/–/g;
$content =~ s/â†/↑/g;
$content =~ s/âœ…/✅/g;
$content =~ s/ðŸš€/🚀/g;

open $fh, '>:utf8', $file or die "Cannot write $file: $!";
print $fh $content;
close $fh;

print "All emojis have been fixed!\n";
