

<!-- INSERT_TIP_BELOW_DO_NOT_EDIT_THIS_LINE -->




---


<!-- 4ea42c -->

`a` enter into insert mode after the character your cursor is on. 

 
---


<!-- 8517c2 -->

`A` enter into insert mode at the end of the current line.


---


<!-- b7419c -->

`b` move cursor to first character of previous word.


---


<!-- 2087ec -->

`B` move cursor to first character of previous non-blank series of characters.


---


<!-- b5d81a -->

`<C-b>` scroll page backwards (move up in the file).


---


<!-- e85d7f -->

`c` stands for “change”. It will not do anything on its own, but acts as a modifier to
other commands.


---


<!-- 8b1167 -->

`cw` cw stands for change word. This will delete the word your cursor is over
and enter into insert mode.


---


<!-- 71216d -->

`ci(` Change all text in between a set of parenthesis.


---


<!-- 09128f -->

`ci"` If your cursor is in between a set of quotes, this will delete everything
inside those quotes and drop you into insert mode.


---


<!-- dab4dc -->

`ct"` Change text til the quotes.


---


<!-- 690b1a -->

`2ct"` Change text from cursor up til the 2nd quote in a line.


---


<!-- 0038ab -->

`cF"` Change from cursor backwards finding and including the previous quote.


---


<!-- b10ea4 -->

`C` Delete until the end of the line and enter into insert mode.


---


<!-- bee482 -->

`:cd ../` Change directories to one previous.


---


<!-- 9b2964 -->

`:cd ~/Sites/projectname` Change directories to a known directory.


---


<!-- 1f229a -->

CTRL-c In Normal mode, any pending command is aborted. Also aborts current
search.


---


<!-- bc5458 -->

`dd` Delete the current line.


---


<!-- 3f6539 -->

`D` Delete from cursor until the end of the line. Same as `d$`.


---


<!-- ed37d0 -->

`dw` Delete the word your cursor is on. Difference between this and cw is that
you do not enter into insert mode.


---


<!-- ff7aa3 -->

`2dw` This will delete the word your cursor is on as well as the next one. You
can replace 2 with any number.


---


<!-- 3c2c98 -->

`d^` Delete from cursor to beginning of the line.


---


<!-- 489cc0 -->

`d/pattern` Deletes up to first matched pattern.


---


<!-- 6739e6 -->

`2df"` Delete from cursor to find the 2nd quote mark. This is inclusive so it
will delete the second quote. This is a handy command for deleting attributes in
html if your cursor is on the first letter of the attribute.


---


<!-- 0c6880 -->

`di"` Delete everything inside of these quotes.


---


<!-- e93598 -->

`da"` Delete everything with quotes wrapped around (including the quotes).


---


<!-- 40a15d -->

`<C-d>` Scroll half page (in this case “d” is a mnemonic for “down”).


---


<!-- 5c47a9 -->

`:%d` Deletes all lines in a file.


---


<!-- 71f387 -->

`:2,8d` Deletes lines two through eight.


---


<!-- fd7079 -->

`e` jumps to the end of the next word.


---


<!-- 171899 -->

`E` jumps to the end of the next non-blank series of characters.


---


<!-- 71f0f3 -->

`ge` jumps to the end of the previous word.


---


<!-- 001642 -->

`:ea 5m` jump to five minutes ago. Seriously.


---


<!-- 77ee33 -->

`:ea 1h` jump to 1 hour ago.


---


<!-- 91a0ec -->

`:ea 14h 30m` jump to 14 hours and 30 minutes ago. Ok you get the point.


---


<!-- 07b1bb -->

`:e filename` open file in the current window.


---


<!-- f6015f -->

`:e .` open file explorer in current directory.


---


<!-- d0afaa -->

f is for finding things so it doesn’t do anything on it’s own. It will jump to
the next character you type after f. It can be combined with c,d,y to change,
cut, and copy sections of text.


---


<!-- 5cf64e -->

`fr` jumps to the next r on the (same line only).


---


<!-- 0533d0 -->

`ft` jumps to the next t on the (same line only).


---


<!-- 5218bc -->

`f,` jumps to the next , on the (same line only).


---


<!-- 0497ea -->

`Fr` jumps to the previous r (same line only).


---


<!-- 15add2 -->

`Ft` jumps to the previous t (same line only).


---


<!-- de937d -->

`F,` jumps to the previous , (same line only).


---


<!-- 59434c -->

`2df"` delete from cursor through two occurences of “.


---


<!-- 413e6e -->

`<C-f>` scrolls one full page forward.


---


<!-- f7c028 -->

`gx` Go to url under your cursor in a browser.


---


<!-- e3c9a2 -->

`gf` Go open file under your cursor in the current window.


---


<!-- e74322 -->

`g;` Go to the last place you edited text.


---


<!-- f41878 -->

`g,` Go forward in the change list.


---


<!-- b81884 -->

`4g,` Go forward 4 spots on the change list.


---


<!-- 3a70be -->

`gg=G` or `1G=G` format the entire file.


---


<!-- 5f5863 -->

`gn` Grab the next match from last search and visually select it.


---


<!-- 0a7c52 -->

`gi` Go into insert mode at the end of the last insert you did.


---


<!-- e892b3 -->

`ge` Go to the end of the previous word.


---


<!-- f30527 -->

`gp` Pastes just like p but leave the cursor after the pasted text.


---


<!-- 12d05d -->

`gP` Pastes just like P but leave the cursor after the pasted text.


---


<!-- f1f227 -->

`gv` Reselects most recent visual selection.


---


<!-- 934aea -->

`gv$A` Reselects most recent visual selection then moves to the end of the line,
and enters insert mode.


---


<!-- e8f766 -->

`g~~` Switch case of all characters in current line.


---


<!-- 96cc16 -->

`gq` Format selected text.


---


<!-- 587f03 -->

`:%g/pattern/norm @q` Run macro q on all lines in a file that match a pattern.


---


<!-- dad3a7 -->

`:%g/^\d/norm yyGp` This searches for all lines of a file that start with a
digit as the first character. It then copies the line and pastes it at the
bottom of the file.


---


<!-- dd80f5 -->

`:%g/^$/norm dd` Delete all blank lines in a file.


---


<!-- 2aa5e0 -->

`:%g/^\$/norm "Ayy` Yank (copy) all lines that start with a dollar sign and
append them to register A.


---


<!-- 427c14 -->

`h` Move cursor one character to the left.


---


<!-- b9dd78 -->

`4h` Move cursor four characters to the left.


---


<!-- f9abc6 -->

`dh` Delete character to the left of cursor.


---


<!-- 791a10 -->

`:h` Opens up vim help in a new window.


---


<!-- 319b64 -->

`:h a` Opens vim help to documentation on the a key.


---


<!-- a65829 -->

`:h i_CTRL-R` Opens vim help to documentation on pressing control and r while in
insert mode.


---


<!-- e55319 -->

`H` Move cursor to first (highest) line in window.


---


<!-- f4e090 -->

`i` Enter insert mode where your cursor is. Any text you insert will be inserted
before the character your cursor was over.


---


<!-- e4d9fb -->

`4i<tab><escape>` Insert 4 tabs (leaves you in command mode, not insert mode).


---


<!-- c25350 -->

`80i*<escape>` Insert 80 \* characters.


---


<!-- 548cb2 -->

`I` Insert text at the very beginning of the line.


---


<!-- aead5c -->

`j` Moves cursor down one line.


---


<!-- 079d64 -->

`32j` Moves the cursor down 32 lines.


---


<!-- 41b9c0 -->

`J` Joins two lines removing indent.


---


<!-- 8308f6 -->

`k` moves cursor up one line.


---


<!-- 902fcd -->

`8k` moves cursor up 8 lines.


---


<!-- f49620 -->

`<C-w>K` rotates window to horizontal split.


---


<!-- 0baeb0 -->

`dk` delete current line and line above cursor.


---


<!-- 693ca9 -->

`l` Move cursor right one character.


---


<!-- 428673 -->

`dl` Delete character under cursor. Same as x.


---


<!-- a2c290 -->

`L` Move cursor to last line in window.


---


<!-- 0ee094 -->

`m` plus a letter is for marking. E.g.: `mk` makes a mark "k". Apostrophe (') or backtick (`) + "k"
will jump back to the mark.


---


<!-- 14a089 -->

`'k` return the cursor to the spot you marked as “k”.


---


<!-- 9de192 -->

`d'k` delete from the cursor’s position to the spot you marked as “k”.


---


<!-- 04f023 -->

`c'k` change from the cursor’s position to the spot you marked as “k”.


---


<!-- f03411 -->

`y'k` yank/copy from the cursor’s position to the spot you marked as “k”.


---


<!-- dfc7e0 -->

`M` Move cursor to middle of window.


---


<!-- 5cf5f1 -->

`n` moves forward to next match of a search pattern.


---


<!-- 444f1a -->

`N` moves backwards to previous match of a search pattern.


---


<!-- 9a0a42 -->

`gn` search forward for the last used search pattern.


---


<!-- 55719a -->

`o` Opens a new line below where your cursor is and places you in insert mode.


---


<!-- 26e943 -->

`O` Opens a new line above where your cursor is and places you in insert mode.


---


<!-- 35302e -->

`CTRL-o` Go backwards in the jumplist (list of where your cursor has been).
Trust me this is like movement steroids.


---


<!-- 665e8a -->

`12CTRL-o` You can also pass it a count so this will go backwards in the
jumplist 12 spots.


---


<!-- 8244bf -->

`:only` Closes all splits except for the current one.


---


<!-- ed1395 -->

Paste is a pretty big deal when you are dealing with code. So p should be one of
your best friends.


---


<!-- b3cb7a -->

`p` pastes in the last thing you yanked or deleted (copied or cut) after the
cursor.


---


<!-- 953862 -->

`P` pastes in the last thing you yanked or deleted (copied or cut) before the
cursor.


---


<!-- a5b749 -->

`2p` pastes in the last thing you yanked or deleted (copied or cut) twice.


---


<!-- 48555e -->

`xp` this will swap two characters. Technically it just deletes the character
under your cursor, then pastes it back in. This is the equivalent of `dlp`.


---


<!-- 4bad24 -->

`"*p` Pastes in text from your system clipboard.


---


<!-- b0819c -->

`"2p` This will paste in text from the second register. You will use this all of
the time. Most useful when you delete something you want to paste, then delete
something else. Move to the place where you want to paste text, hit p and go
“doh”. Just remember `"2p`.


---


<!-- e7552b -->

`"%p` Pastes in the name of the current file.


---


<!-- 09aa3d -->

`:212pu` Pastes in last copy or delete on line 212. 212 can be any line number.


---


<!-- 3cf668 -->

`:42pu *` Pastes in system clipboard text at line 42.


---


<!-- fb04b7 -->

`"/p` Pastes in your last search pattern.


---


<!-- ebed70 -->

`:<c-r>/` Pastes in your last search pattern when you are on the command line.


---


<!-- 54be36 -->

`"ap` Pastes in the contents of register a. To see a list of registers and what
they have in them, do `:reg` or `:registers`.


---


<!-- 41624e -->

`"= 8*8<CR>p` Pastes in evaluation of the expression `8*8`. This could be any
maths you want. `=` is the expression register, which allows you to do
calculations. From normal mode you can launch it by hitting `"=`.


---


<!-- e7be72 -->

q records things - so it doesn’t do much on its own. You need to tell it what
register to store the recorded sequence in.


---


<!-- 358677 -->

`qa` Begins recording into register a. Enter in keystrokes you want to save,
then hit `q` to end the recording.


---


<!-- 621750 -->

`@a` Will play back what you just recorded into register a.


---


<!-- 7d0b84 -->

`:q` quits file only if you have no unsaved changes.


---


<!-- 168906 -->

`:q!` quits file without writing any of your changes.


---


<!-- 17ffb6 -->

`:wq` saves and quits file.


---


<!-- 8bfa64 -->

`:12,42wq` saves lines 12 to 42 and quits file.


---


<!-- 791fa0 -->

`:wqa` saves and quits all files in buffer.


---


<!-- c1af10 -->

`r` Replaces character under cursor with next input i.e.


---


<!-- 70e4cd -->

`ra` Replaces the character under the cursor with a.


---


<!-- 625a0c -->

`R` Enter “replace mode” which is like insert mode except you will overwrite
characters instead of insert between them.


---


<!-- 9385e9 -->

`:r filename` Read the contents of filename and place into the current buffer.


---


<!-- f1ce9a -->

`:r !ls` Pastes in the output of ls. ! calls an external process in vim. So this
can be pretty userful.


---


<!-- cae396 -->

`:r !cd -; ls` Pastes in the directory listing of the last directory you were
in.


---


<!-- 192dd8 -->

`:r !w3m -dump http://somewebsite.com` Pastes in the content from
somewebsite.com without any of the markup. Must have w3m installed. WHICH YOU
SHOULD :) If you have homebrew installed you can simply run `brew install w3m`.


---


<!-- 8e0269 -->

`:r !tree` Pastes in the output from running tree on a directory.


---


<!-- 95e422 -->

`:reg` or `:registers` Print out a list of available registers and their
contents. Registers are like a multi-shelf clipboard. But it also stores all of
your recent deletes. In vim delete behaves more like cut than a true delete.


---


<!-- fb9f73 -->

`s` deletes the character your cursor is on and enters into insert mode.


---


<!-- 2769dd -->

`S` deletes the whole line you are on and enters into insert mode.


---


<!-- 9aceb4 -->

`:sp` This will split the current window horizontally. Sp is short for split.


---


<!-- 9775b4 -->

`:sp file.txt` This will split the current window horizontally with a file named
file.txt.


---


<!-- aef811 -->

`:vsp file.txt` This will split the current window vertically. vsp stands for
vertical split.


---


<!-- b0f013 -->

`s` is how you do find and replace, so let’s just say it is all of the important.


---


<!-- b84456 -->

`:s/foo/bar` replaces foo with bar on the current line for the first occurance
of foo.


---


<!-- 6b0e0f -->

`:12,42s/foo/bar` replaces foo with bar on lines 12,42 for the first occurance
of foo in each line.


---


<!-- 0610c7 -->

`:12,42s/foo/bar/g` replaces all occurances of foo with bar on lines 12,42.


---


<!-- 1c3f6b -->

`:%s/foo/bar/g` replaces all occurances of foo with bar for the entire file.


---


<!-- afc365 -->

`:'<,'>s/foo/bar/g` replaces all occurances of foo with bar for the last visual
selection.


---


<!-- 7dc3f6 -->

`:%~` Repeat last substitute with same substitute string but with last used
search pattern across the entire file.


---


<!-- 0b036a -->

`:%s/\ class=".*"//g"` Delete all classes in markup for the current file.


---


<!-- 593114 -->

`:%s/\ id=".*"//g"` Delete all ids in markup for the current file.


---


<!-- 6e578b -->

`:bufdo %s/\ class=".*"//ge | update` Delete all classes in markup for all files
in buffer.


---


<!-- f54f5a -->

`:tabdo %s/\ class=".*"//ge | update` Delete all classes in markup for all files
in the current tab.


---


<!-- 5e8146 -->

`:%s/\s\+$//e` Removes trailing whitespace.


---


<!-- 83608a -->

`t` means ‘til’ so it doesn’t do anything on its own. It is very similar to f
but f is inclusive. T is exclusive meaning it will stop before the character you
are finding.


---


<!-- 6dc836 -->

`tf` put cursor one character before the next occurance of f.


---


<!-- 6c32fb -->

`;` repeat latest f, F, t, or T.


---


<!-- 84b943 -->

`,` repeat it in the opposite direction.


---


<!-- a89431 -->

`dt<` Delete up until the next `<`. This is handy in the markup world.


---


<!-- 1c008e -->

`dt"` Delete from cursor until next “.


---


<!-- 07ceee -->

`dT}` Delete backwards from cursor until previous }.


---


<!-- ae05f4 -->

`u` Undo changes.


---


<!-- 9bd5a6 -->

`U` Undo all latest changes on one line, the line where the latest change was
made.


---


<!-- 862678 -->

`<C-r>` Redo changes.


---


<!-- 11a814 -->

`<C-u>` Scroll window upwards to the amount set by the “scroll” option. Default
is half a screen.


---


<!-- 86e32c -->

`:undol` List all the history points in your tree of changes.


---


<!-- 817886 -->

`v` Start visual mode on a per character basis.


---


<!-- 30e192 -->

`V` Starts visual mode linewise (selects whole lines).


---


<!-- 0a8734 -->

`CTRL-v` Starts visual mode blockwise (very favorite).


---


<!-- 027b9a -->

`gv` Reselect last visual selection.


---


<!-- eb6afa -->

`w` Moves to the next word.


---


<!-- c68994 -->

`3w` Moves to the third word.


---


<!-- da8c6e -->

`x` delete character under your cursor.


---


<!-- 663968 -->

`X` this will delete a character before the cursor. Same as `dh`.


---


<!-- f4daad -->

y stands for copy, I mean yank. It doesn’t do anything by itself. It is very
similar to c and d in how it can be used.


---


<!-- 64a8b1 -->

`yy` Copies current line.


---


<!-- 8f8142 -->

`"xyy` Copies current line into register x.


---


<!-- 873598 -->

`"jY` Copies current line into register j. If you like “Y” to work from the
cursor to the end of line (which is more logical, but not Vi-compatible) use
“:map Y y$”.


---


<!-- 6061b0 -->

`:12,112y` Copies lines 12 through 112.


---


<!-- 40d027 -->

`mk { motion } y'k` Mark a spot k, navigate to a new spot and then copies from
mark k to the current position of your cursor.


---


<!-- c42278 -->

`yt"` Copies from current cursor postion to the next quote on the same line.


---


<!-- efb8d9 -->

`yt>` Copies from current cursor postion to the next > on the same line.


---


<!-- 57914c -->

`yT>` Copies from current cursor postion to the previous > on the same line.


---


<!-- e00015 -->

`yf>` Copies from current cursor postion up to and including the next > on the
same line.


---


<!-- d4d2af -->

`yF>` Copies from current cursor postion up to and including the previous > on
the same line.


---


<!-- 3bf45e -->

`<C-y>` Scroll up by 1 line.


---


<!-- ea8d99 -->

`12<C-y>` Scroll up 12 lines.


---


<!-- aa57a7 -->

`z<CR>` Redraws the screen so that your cursor line is at the top of the window.
Same as `zt`.


---


<!-- 112244 -->

`z-` Redraws the screen so that your cursor line is at the bottom of the window.
Same as `zb`.


---


<!-- a7d740 -->

`zz` Redraws the screen so that your cursor line is at the middle of the window.


---


<!-- 622159 -->

`*` search forward for the word under cursor in current file. Super useful for
finding common hex codes in css. And other things.


---


<!-- 87d075 -->

`#` search backward for the word under cursor in current file.


---


<!-- a8b543 -->

`/` Forward search for things.


---


<!-- 7f4c9b -->

`/<p>` Forward search for the next opening paragraph tag.


---


<!-- 80037d -->

`/\` Forward search for the next space.


---


<!-- 0de26d -->

`/^}` Forward search for closing bracket of a css class, if the css class is
closed at the beginning of a new line i.e.


---


<!-- bf8b4b -->

`?` Backwards search.


---


<!-- fea3cb -->

`?http` Search backwards for the string `http`.


---


<!-- 008f67 -->

`==` Format current line of code.


---


<!-- bb94cb -->

`>>` Indent current line.


---


<!-- 9e0b0b -->

`.` Repeat last change.


---


<!-- dfc76b -->

`@:` Repeat last command line.


---


<!-- f9e2ad -->

`:set paste` Set this if you are pasting in content from the system clipboard.
Trust me.


---


<!-- 1ee0ae -->

`:set paste!` Using ! at the end of any set reverses the current setting. This
is useful so that you only have to remember one command and you never have to
remember current state. For instance to be able to see line numbers you can do
`:set nu` or `:set number`. To undo these commands, you would set `:set nonu` or
`:set nonumber`. This seems like a lot to remember. An alternative is using !
like so `:set nu!` This will reverse whatever state set number currently
resolves to. If line numbers are currently shown, they will be hidden. If they
are hidden, they will become revealed. I use this pattern a lot when changing
settings of file.


---


<!-- 30dd76 -->

`:12,54=` Format lines 12 through 54.


---


<!-- 8a782b -->

`:56,99>` Indent lines 56 through 99.


---


<!-- 19b8f9 -->

`:52,84y` Yank / copy lines 52 through 84.


---


<!-- 6d9f6e -->

`12>>` Indent 12 lines including the line you are on.


---


<!-- f7977f -->

Remember `<C-` means the control key. So `<C-b>` would translate to pressing
control and b at the same time.


---


<!-- df2793 -->

`<C-b>` Scroll backwards one full screen.


---


<!-- 095a00 -->

`<C-u>` Scroll backwards or ‘up’ a half screen.


---


<!-- 328b9f -->

`<C-d>` Scroll forwards or ‘down’ a half screen.


---


<!-- f3baa2 -->

`<C-f>` Scroll forwards.


---


<!-- 44c4d0 -->

`<C-y>` Scroll backwards count lines (defaults to one).


---


<!-- 3e9bac -->

`<C-e>` Scroll forwards one full line.


---


<!-- 3fa7dc -->

`<C-y>` Scroll backwards one full line.


---

<!-- INSERT_TIP_BELOW_DO_NOT_EDIT_THIS_LINE -->




---