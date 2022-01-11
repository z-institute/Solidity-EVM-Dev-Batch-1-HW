.PHONY: english

CC = xelatex
ENGLISH_DIR = english
RESUME_DIR = english/resume
RESUME_SRCS = $(shell find $(RESUME_DIR) -name '*.tex')

english: $(foreach x, resume, $x.pdf)

resume.pdf: $(ENGLISH_DIR)/resume.tex $(RESUME_SRCS)
	$(CC) -output-directory=$(ENGLISH_DIR) $<

clean:
	rm -rf $(ENGLISH_DIR)/*.pdf
